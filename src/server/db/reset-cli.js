// Drops every table in the database and rebuilds them with the sample content.
// For a local database whose tables are from an older version of this app.
import { config } from '../config.js';
import { sequelize } from './index.js';
import './models.js';
import { dropEverything } from './schema.js';
import { seedMissing } from './seed.js';

const dbUrl = new URL(config.databaseUrl);
const dbName = dbUrl.pathname.replace(/^\//, '');

if (config.isProd) {
  console.error('db:reset does not run with NODE_ENV=production.');
  process.exit(1);
}

// A second guard for a server where NODE_ENV was never set: only a database on
// this machine can be reset. An empty host is a local socket.
if (!['', 'localhost', '127.0.0.1', '[::1]'].includes(dbUrl.hostname)) {
  console.error(
    `db:reset only runs against a database on this machine, and DATABASE_URL points at "${dbUrl.hostname}".`,
  );
  process.exit(1);
}

// Older tables may lack columns, so count by table name only.
async function countRows(table) {
  try {
    const [[{ count }]] = await sequelize.query(
      `SELECT count(*)::int AS count FROM "${table}"`,
    );
    return count;
  } catch {
    return 0;
  }
}

const rows = {
  users: await countRows('users'),
  notes: await countRows('posts'),
  'check-ins': await countRows('quizAttempts'),
  videos: await countRows('videos'),
};
const summary = Object.entries(rows)
  .map(([name, count]) => `${count} ${name}`)
  .join(', ');

if (!process.argv.includes('--yes')) {
  console.error(
    `This drops every table in "${dbName}" (${summary}) and rebuilds them with the sample content.\nRun it again with --yes to go ahead: npm run db:reset -- --yes`,
  );
  await sequelize.close();
  process.exit(1);
}

const dropped = await dropEverything();
await sequelize.sync();
const seeded = await seedMissing();
console.log(
  `Dropped ${dropped} tables in "${dbName}" (${summary}). Rebuilt them and seeded ${seeded.videos} videos and ${seeded.quizzes} quizzes.`,
);
await sequelize.close();
