import { Router } from 'express';
import { VideoChannel } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  res.json(await VideoChannel.findAll({ order: [['id', 'ASC']] }));
});

export default router;
