import { createApp } from './app.js';
import { config } from './config.js';
import { sequelize } from './db/index.js';
import { seedIfEmpty } from './db/seed.js';
import './db/models.js';

const dbName = new URL(config.databaseUrl).pathname.replace(/^\//, '');

// Turns the usual local setup errors into one line each, instead of a stack trace.
function explainConnectionError(err) {
  if (err.parent?.code === '3D000') {
    return `Database "${dbName}" does not exist. Create it with: createdb ${dbName}`;
  }
  if (err.parent?.code === 'ECONNREFUSED' || err.original?.code === 'ECONNREFUSED') {
    return `Cannot reach Postgres at ${new URL(config.databaseUrl).host}. Is it running?`;
  }
  return null;
}

try {
  await sequelize.authenticate();
} catch (err) {
  const hint = explainConnectionError(err);
  if (!hint) throw err;
  console.error(`\n${hint}\nThen run npm run dev again.\n`);
  process.exit(1);
}

// Creates tables that are missing and keeps existing data. Schema changes need migrations.
await sequelize.sync();
if (await seedIfEmpty()) console.log('Seeded sample content');

createApp().listen(config.port, '127.0.0.1', () => {
  console.log(`Listening on http://127.0.0.1:${config.port}`);
});
