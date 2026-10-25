import { sequelize } from './index.js';
import './models.js';
import { seedMissing } from './seed.js';

await sequelize.sync();
console.log(
  (await seedIfEmpty())
    ? 'Seeded sample content'
    : 'Database already has content',
);
await sequelize.close();
