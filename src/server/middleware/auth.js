import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { User } from '../db/models.js';

export const SESSION_COOKIE = 'session';

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.isProd,
    path: '/',
    maxAge: config.sessionDays * 24 * 60 * 60 * 1000,
  };
}

export function issueSession(res, user) {
  const token = jwt.sign({ sub: String(user.id) }, config.jwtSecret, {
    expiresIn: `${config.sessionDays}d`,
  });
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions());
}

// Loads req.user from the session cookie. Responds 401 when missing or invalid.
export async function requireAuth(req, res, next) {
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) return res.status(401).json({ error: 'Not signed in' });

  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch {
    return res.status(401).json({ error: 'Session expired' });
  }

  const user = await User.findByPk(payload.sub);
  if (!user) return res.status(401).json({ error: 'Not signed in' });

  req.user = user;
  next();
}
