import { Router } from 'express';
import { User } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Both people, so the client can draw one row per person.
router.get('/', requireAuth, async (req, res) => {
  res.json(await User.findAll({ order: [['id', 'ASC']] }));
});

export default router;
