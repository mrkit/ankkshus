import { Router } from 'express';
import { z } from 'zod';
import { User } from '../db/models.js';
import {
  issueSession,
  requireAuth,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const credentials = z.object({
  username: z.string().trim().min(3).max(64),
  password: z.string().min(8).max(200),
});

const router = Router();

router.post('/signup', validateBody(credentials), async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ where: { username } });
  if (existing)
    return res.status(409).json({ error: 'That username is taken' });

  const user = await User.create({
    username,
    passwordHash: await User.hashPassword(password),
  });
  issueSession(res, user);
  res.status(201).json({ user });
});

router.post('/login', validateBody(credentials), async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  // Same message for unknown user and wrong password, so usernames cannot be probed.
  const ok = user ? await user.checkPassword(password) : false;
  if (!ok)
    return res.status(401).json({ error: 'Invalid username or password' });

  issueSession(res, user);
  res.json({ user });
});

router.post('/logout', (_req, res) => {
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions());
  res.status(204).end();
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
