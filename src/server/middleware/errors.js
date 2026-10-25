import { UniqueConstraintError, ValidationError } from 'sequelize';
import { ZodError } from 'zod';

export function notFound(_req, res) {
  res.status(404).json({ error: 'Not found' });
}

// Express 5 forwards rejected async handlers here.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({ error: 'That value is already taken' });
  }
  if (err instanceof ValidationError) {
    return res
      .status(400)
      .json({ error: err.errors.map((e) => e.message).join(', ') });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Malformed JSON' });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
}
