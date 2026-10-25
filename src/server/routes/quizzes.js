import { Router } from 'express';
import { QuizQuestion, QuizSection, QuizTitle } from '../db/models.js';
import { idParam } from '../middleware/validate.js';

const router = Router();

const include = [
  {
    model: QuizSection,
    include: [{ model: QuizQuestion }],
  },
];

// Returns every quiz with its sections and questions nested, ordered by id.
router.get('/', async (_req, res) => {
  const quizzes = await QuizTitle.findAll({
    include,
    order: [
      ['id', 'ASC'],
      [QuizSection, 'id', 'ASC'],
      [QuizSection, QuizQuestion, 'id', 'ASC'],
    ],
  });
  res.json(quizzes);
});

router.get('/:id', async (req, res) => {
  const quiz = await QuizTitle.findByPk(idParam.parse(req.params.id), {
    include,
    order: [
      [QuizSection, 'id', 'ASC'],
      [QuizSection, QuizQuestion, 'id', 'ASC'],
    ],
  });
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json(quiz);
});

export default router;
