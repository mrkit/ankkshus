import { createApp } from './app.js';
import { config } from './config.js';
import { sequelize } from './db/index.js';
import { seedIfEmpty } from './db/seed.js';
import './db/models.js';

await sequelize.authenticate();
// Creates tables that are missing and keeps existing data. Schema changes need migrations.
await sequelize.sync();
if (await seedIfEmpty()) console.log('Seeded sample content');

createApp().listen(config.port, '127.0.0.1', () => {
  console.log(`Listening on http://127.0.0.1:${config.port}`);
});
