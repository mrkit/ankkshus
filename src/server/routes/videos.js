import { Router } from 'express';
import { z } from 'zod';
import { Video } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';
import { idParam, validateBody } from '../middleware/validate.js';

const videoFields = z.object({
  title: z.string().trim().min(1).max(200),
  url: z.url(),
  videoChannelId: z.number().int().positive().nullish(),
});

const router = Router();

router.get('/', async (req, res) => {
  const where = req.query.channelId
    ? { videoChannelId: idParam.parse(req.query.channelId) }
    : {};
  const videos = await Video.findAll({ where, order: [['id', 'ASC']] });
  res.json(videos);
});

router.post('/', requireAuth, validateBody(videoFields), async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
});

router.put(
  '/:id',
  requireAuth,
  validateBody(videoFields.partial()),
  async (req, res) => {
    const id = idParam.parse(req.params.id);
    const video = await Video.findByPk(id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const updated = await video.update(req.body);
    res.json(updated);
  },
);

router.delete('/:id', requireAuth, async (req, res) => {
  const id = idParam.parse(req.params.id);
  const deleted = await Video.destroy({ where: { id } });
  if (!deleted) return res.status(404).json({ error: 'Video not found' });
  res.status(204).end();
});

export default router;
