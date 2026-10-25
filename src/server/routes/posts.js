import { Router } from 'express';
import { z } from 'zod';
import { Post, User } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';
import { idParam, validateBody } from '../middleware/validate.js';

const postFields = z.object({
  title: z.string().trim().min(1).max(200),
  article: z.string().trim().min(1).max(20000),
});

const withAuthor = {
  include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
};

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const posts = await Post.findAll({
    ...withAuthor,
    order: [['createdAt', 'DESC']],
  });
  res.json(posts);
});

router.post('/', requireAuth, validateBody(postFields), async (req, res) => {
  const post = await Post.create({ ...req.body, authorId: req.user.id });
  res.status(201).json(await Post.findByPk(post.id, withAuthor));
});

router.put(
  '/:id',
  requireAuth,
  validateBody(postFields.partial()),
  async (req, res) => {
    const id = idParam.parse(req.params.id);
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Note not found' });
    if (post.authorId !== req.user.id)
      return res.status(403).json({ error: 'Only the author can edit a note' });

    await post.update(req.body);
    res.json(await Post.findByPk(id, withAuthor));
  },
);

router.delete('/:id', requireAuth, async (req, res) => {
  const id = idParam.parse(req.params.id);
  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ error: 'Note not found' });
  if (post.authorId !== req.user.id)
    return res.status(403).json({ error: 'Only the author can delete a note' });

  await post.destroy();
  res.status(204).end();
});

export default router;
