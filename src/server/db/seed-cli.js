import { sequelize } from './index.js';
import './models.js';
import { seedIfEmpty } from './seed.js';

await sequelize.sync();
console.log(
  (await seedIfEmpty())
    ? 'Seeded sample content'
    : 'Database already has content',
);
await sequelize.close();
