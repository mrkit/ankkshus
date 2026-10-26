import { sequelize } from './index.js';
import './models.js';
import { seedMissing } from './seed.js';

await sequelize.sync();
const seeded = await seedMissing();
console.log(
  seeded.videos || seeded.quizzes
    ? `Seeded ${seeded.videos} videos and ${seeded.quizzes} quizzes`
    : 'Nothing to seed: the sample videos and every quiz are already there',
);
await sequelize.close();
