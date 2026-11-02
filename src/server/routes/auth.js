import { createHash, timingSafeEqual } from 'node:crypto';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { config } from '../config.js';
import { sequelize } from '../db/index.js';
import { Passkey, User } from '../db/models.js';
import {
  issueSession,
  requireAuth,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

// The site is for two people. Once both have a seat, nobody else can sign up.
export const SEATS = 2;

// A passkey ceremony is two requests: options, then the signed response. The
// challenge from the first rides in a short-lived signed cookie to the second.
const CHALLENGE_COOKIE = 'passkey-challenge';
const challengeCookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: config.isProd,
  path: '/api/auth',
  maxAge: 5 * 60 * 1000,
};

function setChallenge(res, payload) {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '5m' });
  res.cookie(CHALLENGE_COOKIE, token, challengeCookieOptions);
}

function takeChallenge(req, res, purpose) {
  res.clearCookie(CHALLENGE_COOKIE, challengeCookieOptions);
  const token = req.cookies?.[CHALLENGE_COOKIE];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    return payload.purpose === purpose ? payload : null;
  } catch {
    return null;
  }
}

function setupCodeMatches(given) {
  if (!config.setupCode) return false;
  const digest = (s) => createHash('sha256').update(s).digest();
  return timingSafeEqual(digest(given), digest(config.setupCode));
}

// Why a new seat cannot be made, or null when it can.
async function seatProblem(username) {
  if ((await User.count()) >= SEATS)
    return [403, 'Both seats at this table are taken. Sign in instead.'];
  if (await User.findOne({ where: { username } }))
    return [409, 'That name is taken at this table.'];
  return null;
}

const newSeat = z.object({
  username: z.string().trim().min(2).max(64),
  setupCode: z.string().min(1).max(200),
});

// A browser's WebAuthn response; the library checks the rest.
const ceremonyResponse = z.object({ id: z.string().min(1).max(1024) }).loose();

const router = Router();

router.post('/register/options', validateBody(newSeat), async (req, res) => {
  const { username, setupCode } = req.body;
  if (!setupCodeMatches(setupCode))
    return res.status(403).json({ error: 'That setup code is not right.' });
  const problem = await seatProblem(username);
  if (problem) return res.status(problem[0]).json({ error: problem[1] });

  const options = await generateRegistrationOptions({
    rpName: config.passkey.rpName,
    rpID: config.passkey.rpID,
    userName: username,
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'required',
    },
  });
  setChallenge(res, {
    purpose: 'register',
    challenge: options.challenge,
    username,
  });
  res.json(options);
});

router.post(
  '/register/verify',
  validateBody(ceremonyResponse),
  async (req, res) => {
    const pending = takeChallenge(req, res, 'register');
    if (!pending)
      return res
        .status(400)
        .json({ error: 'That took too long. Start again.' });
    const problem = await seatProblem(pending.username);
    if (problem) return res.status(problem[0]).json({ error: problem[1] });

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: req.body,
        expectedChallenge: pending.challenge,
        expectedOrigin: config.passkey.origin,
        expectedRPID: config.passkey.rpID,
      });
    } catch {
      verification = { verified: false };
    }
    if (!verification.verified)
      return res
        .status(400)
        .json({ error: 'The passkey could not be checked.' });

    const { credential } = verification.registrationInfo;
    const user = await sequelize.transaction(async (transaction) => {
      const row = await User.create(
        { username: pending.username },
        { transaction },
      );
      await Passkey.create(
        {
          credentialId: credential.id,
          publicKey: Buffer.from(credential.publicKey),
          counter: credential.counter,
          transports: credential.transports ?? null,
          userId: row.id,
        },
        { transaction },
      );
      return row;
    });
    issueSession(res, user);
    res.status(201).json({ user });
  },
);

// No name is asked for: the passkey says whose it is.
router.post('/login/options', async (_req, res) => {
  const options = await generateAuthenticationOptions({
    rpID: config.passkey.rpID,
    userVerification: 'required',
  });
  setChallenge(res, { purpose: 'login', challenge: options.challenge });
  res.json(options);
});

router.post(
  '/login/verify',
  validateBody(ceremonyResponse),
  async (req, res) => {
    const pending = takeChallenge(req, res, 'login');
    if (!pending)
      return res
        .status(400)
        .json({ error: 'That took too long. Start again.' });

    const passkey = await Passkey.findOne({
      where: { credentialId: req.body.id },
      include: User,
    });
    if (!passkey)
      return res
        .status(401)
        .json({ error: 'That passkey does not belong to this table.' });

    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: req.body,
        expectedChallenge: pending.challenge,
        expectedOrigin: config.passkey.origin,
        expectedRPID: config.passkey.rpID,
        credential: {
          id: passkey.credentialId,
          publicKey: new Uint8Array(passkey.publicKey),
          counter: Number(passkey.counter),
          transports: passkey.transports ?? undefined,
        },
      });
    } catch {
      verification = { verified: false };
    }
    if (!verification.verified)
      return res
        .status(401)
        .json({ error: 'The passkey could not be checked.' });

    await passkey.update({
      counter: verification.authenticationInfo.newCounter,
    });
    issueSession(res, passkey.user);
    res.json({ user: passkey.user });
  },
);

router.post('/logout', (_req, res) => {
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions());
  res.status(204).end();
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
