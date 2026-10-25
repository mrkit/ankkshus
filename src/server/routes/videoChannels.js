import { Router } from 'express';
import { VideoChannel } from '../db/models.js';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await VideoChannel.findAll({ order: [['id', 'ASC']] }));
});

export default router;
