import { sequelize } from './index.js';
import {
  Quiz,
  QuizQuestion,
  QuizSection,
  Video,
  VideoChannel,
} from './models.js';
import burns from './quizzes/burns.js';

// Every quiz definition the site ships. Adding a file here and listing it is
// enough: the seed adds any quiz whose slug is not in the database yet.
export const quizDefinitions = [burns];

const videoEpisodes = [
  'https://youtu.be/1A_CAkYt3GY',
  'https://youtu.be/NKEhdsnKKHs',
  'https://youtu.be/-wrCpLJ1XAw',
  'https://youtu.be/IV-8YsyghbU',
  'https://youtu.be/MLKrmw906TM',
  'https://youtu.be/5C-s4JrymKM',
];

async function seedVideos(transaction) {
  if ((await VideoChannel.count({ transaction })) > 0) return 0;
  const channel = await VideoChannel.create(
    { name: 'Crash Course Philosophy' },
    { transaction },
  );
  await Video.bulkCreate(
    videoEpisodes.map((url, i) => ({
      title: `Episode ${i + 1}`,
      url,
      videoChannelId: channel.id,
    })),
    { transaction },
  );
  return videoEpisodes.length;
}

async function seedQuiz(definition, transaction) {
  const exists = await Quiz.findOne({
    where: { slug: definition.slug },
    transaction,
  });
  if (exists) return false;

  const { sections, ...fields } = definition;
  const quiz = await Quiz.create(fields, { transaction });
  for (const [sectionIndex, section] of sections.entries()) {
    const { questions, ...sectionFields } = section;
    const row = await QuizSection.create(
      { ...sectionFields, order: sectionIndex, quizId: quiz.id },
      { transaction },
    );
    await QuizQuestion.bulkCreate(
      questions.map((question, order) => ({
        ...question,
        order,
        quizSectionId: row.id,
      })),
      { transaction },
    );
  }
  return true;
}

// Adds sample videos when there are none, and any quiz not yet in the database.
// Existing rows are left alone, so this is safe to run on every start.
export async function seedMissing() {
  return sequelize.transaction(async (transaction) => {
    const videos = await seedVideos(transaction);
    let quizzes = 0;
    for (const definition of quizDefinitions) {
      if (await seedQuiz(definition, transaction)) quizzes += 1;
    }
    return { videos, quizzes };
  });
}
