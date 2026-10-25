const isProd = process.env.NODE_ENV === 'production';

const jwtSecret =
  process.env.JWT_SECRET ?? (isProd ? undefined : 'dev-only-secret-change-me');
if (!jwtSecret) {
  throw new Error('JWT_SECRET must be set in production');
}

export const config = {
  isProd,
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://localhost/ankkshus',
  jwtSecret,
  sessionDays: 7,
};
