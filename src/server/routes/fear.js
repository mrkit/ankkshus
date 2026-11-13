import { Router } from 'express';
import { z } from 'zod';
import { FearEntry } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';
import { idParam, validateBody } from '../middleware/validate.js';

const rating = z.number().int().min(0).max(10).nullable().optional();

const entryFields = z.object({
  step: z.string().regex(/^[a-z0-9-]{1,48}$/),
  // Answers are the step's own fields (text, ratings, a ladder of rungs).
  // Any JSON object is accepted, up to a size cap.
  answers: z
    .record(z.string().max(64), z.unknown())
    .refine((o) => JSON.stringify(o).length <= 20000, 'Answers are too long')
    .default({}),
  before: rating,
  after: rating,
});

const router = Router();

// Only the signed-in person's own entries. Neither seat sees the other's.
router.get('/', requireAuth, async (req, res) => {
  res.json(
    await FearEntry.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    }),
  );
});

router.post('/', requireAuth, validateBody(entryFields), async (req, res) => {
  const entry = await FearEntry.create({ ...req.body, userId: req.user.id });
  res.status(201).json(entry);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = idParam.parse(req.params.id);
  const count = await FearEntry.destroy({
    where: { id, userId: req.user.id },
  });
  if (!count) return res.status(404).json({ error: 'Entry not found' });
  res.status(204).end();
});

export default router;
