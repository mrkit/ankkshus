import { Router } from 'express';
import { z } from 'zod';
import { Post } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';
import { idParam, validateBody } from '../middleware/validate.js';

const postFields = z.object({
  title: z.string().trim().min(1).max(200),
  date: z.string().trim().min(1).max(100),
  author: z.string().trim().min(1).max(100),
  article: z.string().min(1).max(20000),
});

const router = Router();

router.get('/', async (_req, res) => {
  const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
  res.json(posts);
});

router.post('/', requireAuth, validateBody(postFields), async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json(post);
});

router.put(
  '/:id',
  requireAuth,
  validateBody(postFields.partial()),
  async (req, res) => {
    const id = idParam.parse(req.params.id);
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const updated = await post.update(req.body);
    res.json(updated);
  },
);

router.delete('/:id', requireAuth, async (req, res) => {
  const id = idParam.parse(req.params.id);
  const deleted = await Post.destroy({ where: { id } });
  if (!deleted) return res.status(404).json({ error: 'Post not found' });
  res.status(204).end();
});

export default router;
