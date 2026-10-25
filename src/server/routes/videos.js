import { Router } from 'express';
import { z } from 'zod';
import { User, Video } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';
import { idParam, validateBody } from '../middleware/validate.js';

const videoFields = z.object({
  title: z.string().trim().min(1).max(200),
  url: z.url(),
  videoChannelId: z.number().int().positive().nullish(),
});

const withAdder = {
  include: [{ model: User, as: 'addedBy', attributes: ['id', 'username'] }],
};

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const where = req.query.channelId
    ? { videoChannelId: idParam.parse(req.query.channelId) }
    : {};
  res.json(
    await Video.findAll({
      ...withAdder,
      where,
      order: [['createdAt', 'DESC']],
    }),
  );
});

router.post('/', requireAuth, validateBody(videoFields), async (req, res) => {
  const video = await Video.create({ ...req.body, addedById: req.user.id });
  res.status(201).json(await Video.findByPk(video.id, withAdder));
});

router.put(
  '/:id',
  requireAuth,
  validateBody(videoFields.partial()),
  async (req, res) => {
    const id = idParam.parse(req.params.id);
    const video = await Video.findByPk(id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    await video.update(req.body);
    res.json(await Video.findByPk(id, withAdder));
  },
);

router.delete('/:id', requireAuth, async (req, res) => {
  const id = idParam.parse(req.params.id);
  const deleted = await Video.destroy({ where: { id } });
  if (!deleted) return res.status(404).json({ error: 'Video not found' });
  res.status(204).end();
});

export default router;
