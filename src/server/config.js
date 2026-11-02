const isProd = process.env.NODE_ENV === 'production';

const jwtSecret =
  process.env.JWT_SECRET ?? (isProd ? undefined : 'dev-only-secret-change-me');
if (!jwtSecret) {
  throw new Error('JWT_SECRET must be set in production');
}

// Passkeys are bound to the site's origin: http://localhost:5173 under Vite,
// https://ankkshus.com in production.
const passkeyOrigin =
  process.env.PASSKEY_ORIGIN ?? (isProd ? undefined : 'http://localhost:5173');
if (!passkeyOrigin) {
  throw new Error('PASSKEY_ORIGIN must be set in production');
}

export const config = {
  isProd,
  port: Number(process.env.PORT ?? 3000),
  // 0.0.0.0 inside a container, so the published port reaches it.
  host: process.env.HOST ?? '127.0.0.1',
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://localhost/ankkshus',
  jwtSecret,
  sessionDays: 7,
  passkey: {
    origin: passkeyOrigin,
    rpID: new URL(passkeyOrigin).hostname,
    rpName: 'ankkshus',
  },
  // Creating a seat needs this code. Unset in production means sign-up is closed.
  setupCode: process.env.SETUP_CODE ?? (isProd ? undefined : 'dev-setup'),
};
