import { Router } from 'express';
import { Op } from 'sequelize';
import { z } from 'zod';
import {
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  QuizSection,
  User,
} from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';
import { idParam } from '../middleware/validate.js';

const router = Router();

const fullInclude = [
  {
    model: QuizSection,
    as: 'sections',
    include: [{ model: QuizQuestion, as: 'questions' }],
  },
];

const fullOrder = [
  [{ model: QuizSection, as: 'sections' }, 'order', 'ASC'],
  [
    { model: QuizSection, as: 'sections' },
    { model: QuizQuestion, as: 'questions' },
    'order',
    'ASC',
  ],
];

const attemptSummary = {
  attributes: ['id', 'total', 'completedAt', 'userId', 'quizId'],
  include: [{ model: User, attributes: ['id', 'username'] }],
  order: [['completedAt', 'DESC']],
};

async function loadQuiz(slug) {
  return Quiz.findOne({
    where: { slug },
    include: fullInclude,
    order: fullOrder,
  });
}

// Every quiz with its size and the newest attempt per person.
router.get('/', requireAuth, async (req, res) => {
  const quizzes = await Quiz.findAll({
    include: fullInclude,
    order: [['order', 'ASC'], ...fullOrder],
  });
  const attempts = await QuizAttempt.findAll(attemptSummary);

  res.json(
    quizzes.map((quiz) => {
      const own = attempts.filter((a) => a.quizId === quiz.id);
      const latestByUser = {};
      for (const attempt of own) {
        if (!latestByUser[attempt.userId])
          latestByUser[attempt.userId] = attempt;
      }
      return {
        id: quiz.id,
        slug: quiz.slug,
        title: quiz.title,
        kind: quiz.kind,
        summary: quiz.summary,
        source: quiz.source,
        videoUrl: quiz.videoUrl,
        videoTitle: quiz.videoTitle,
        sectionCount: quiz.sections.length,
        questionCount: quiz.sections.reduce(
          (n, s) => n + s.questions.length,
          0,
        ),
        attemptCount: own.length,
        latestAttempts: Object.values(latestByUser),
      };
    }),
  );
});

// Checklist attempts across every quiz, newest first, for the weather strip.
router.get('/attempts', requireAuth, async (req, res) => {
  const weeks = z.coerce
    .number()
    .int()
    .min(1)
    .max(104)
    .default(12)
    .parse(req.query.weeks);
  const since = new Date();
  since.setDate(since.getDate() - weeks * 7);

  const attempts = await QuizAttempt.findAll({
    ...attemptSummary,
    include: [
      ...attemptSummary.include,
      {
        model: Quiz,
        attributes: ['slug', 'title', 'kind'],
        where: { kind: 'checklist' },
      },
    ],
    where: { completedAt: { [Op.gte]: since } },
  });
  res.json(attempts);
});

router.get('/attempts/:id', requireAuth, async (req, res) => {
  const attempt = await QuizAttempt.findByPk(idParam.parse(req.params.id), {
    include: [
      { model: User, attributes: ['id', 'username'] },
      { model: Quiz, attributes: ['id', 'slug', 'title', 'kind'] },
      {
        model: QuizAnswer,
        as: 'answers',
        include: [
          {
            model: QuizQuestion,
            as: 'question',
            attributes: ['id', 'prompt', 'type', 'quizSectionId'],
          },
        ],
      },
    ],
  });
  if (!attempt) return res.status(404).json({ error: 'Check-in not found' });
  res.json(attempt);
});

router.get('/:slug', requireAuth, async (req, res) => {
  const quiz = await loadQuiz(req.params.slug);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json(quiz);
});

router.get('/:slug/attempts', requireAuth, async (req, res) => {
  const quiz = await Quiz.findOne({ where: { slug: req.params.slug } });
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  const attempts = await QuizAttempt.findAll({
    ...attemptSummary,
    where: { quizId: quiz.id },
  });
  res.json(attempts);
});

const answerSchema = z.object({
  questionId: z.number().int().positive(),
  value: z.union([z.number().int().min(0).max(4), z.string().max(5000)]),
});

// Saves one completed quiz. Checklists need every item scored; worksheets
// need at least one written answer. The total is the sum of scale scores.
router.post('/:slug/attempts', requireAuth, async (req, res) => {
  const quiz = await loadQuiz(req.params.slug);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  const parsed = z
    .object({ answers: z.array(answerSchema).min(1) })
    .safeParse(req.body ?? {});
  if (!parsed.success)
    return res.status(400).json({ error: 'Invalid answers' });

  const questions = new Map();
  for (const section of quiz.sections)
    for (const q of section.questions) questions.set(q.id, q);

  const rows = [];
  for (const { questionId, value } of parsed.data.answers) {
    const question = questions.get(questionId);
    if (!question)
      return res
        .status(400)
        .json({ error: `Question ${questionId} is not in this quiz` });
    if (question.type === 'scale') {
      if (typeof value !== 'number')
        return res
          .status(400)
          .json({ error: `"${question.prompt}" needs a score` });
      rows.push({ quizQuestionId: questionId, score: value, text: null });
    } else {
      if (typeof value !== 'string')
        return res
          .status(400)
          .json({ error: `"${question.prompt}" needs text` });
      if (value.trim())
        rows.push({
          quizQuestionId: questionId,
          score: null,
          text: value.trim(),
        });
    }
  }

  const scaleCount = [...questions.values()].filter(
    (q) => q.type === 'scale',
  ).length;
  const scored = rows.filter((r) => r.score !== null);
  if (quiz.kind === 'checklist' && scored.length < scaleCount) {
    return res
      .status(400)
      .json({ error: `Answer all ${scaleCount} items before saving` });
  }
  if (rows.length === 0)
    return res
      .status(400)
      .json({ error: 'Write at least one answer before saving' });

  const total = scaleCount ? scored.reduce((sum, r) => sum + r.score, 0) : null;
  const attempt = await QuizAttempt.create({
    quizId: quiz.id,
    userId: req.user.id,
    total,
  });
  await QuizAnswer.bulkCreate(
    rows.map((r) => ({ ...r, quizAttemptId: attempt.id })),
  );

  res.status(201).json({
    id: attempt.id,
    total,
    completedAt: attempt.completedAt,
    quizSlug: quiz.slug,
  });
});

export default router;
