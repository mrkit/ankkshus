import { sequelize } from './index.js';
import {
  QuizQuestion,
  QuizSection,
  QuizTitle,
  Video,
  VideoChannel,
} from './models.js';

const videoEpisodes = [
  'https://youtu.be/1A_CAkYt3GY',
  'https://youtu.be/NKEhdsnKKHs',
  'https://youtu.be/-wrCpLJ1XAw',
  'https://youtu.be/IV-8YsyghbU',
  'https://youtu.be/MLKrmw906TM',
  'https://youtu.be/5C-s4JrymKM',
];

const burns = {
  title: 'Burns Depression Checklist',
  sections: [
    {
      section: 'Thoughts and Feelings',
      questions: [
        'Feeling sad or down in the dumps',
        'Feeling unhappy or blue',
        'Crying spells or tearfulness',
        'Feeling discouraged',
        'Feeling hopeless',
        'Low self-esteem',
        'Feeling worthless or inadequate',
        'Guilt or shame',
        'Criticizing yourself or blaming others',
        'Difficulty making decisions',
      ],
    },
    {
      section: 'Activities and Personal Relationships',
      questions: [
        'Loss of interest in family, friends or colleagues',
        'Loneliness',
        'Spending less time with family or friends',
        'Loss of motivation',
        'Loss of interest in work or other activities',
        'Avoiding work or other activities',
        'Loss of pleasure or satisfaction in life',
      ],
    },
    {
      section: 'Physical Symptoms',
      questions: [
        'Feeling tired',
        'Difficulty sleeping or sleeping too much',
        'Decreased or increased appetite',
        'Loss of interest in sex',
        'Worrying about your health',
      ],
    },
    {
      section: 'Suicidal Urges',
      questions: [
        'Do you have any suicidal thoughts?',
        'Would you like to end your life?',
        'Do you have a plan for harming yourself?',
      ],
    },
  ],
};

// Adds sample content when the database is empty. Existing tables and rows are left alone.
export async function seedIfEmpty() {
  const hasContent =
    (await VideoChannel.count()) > 0 || (await QuizTitle.count()) > 0;
  if (hasContent) return false;

  await sequelize.transaction(async (transaction) => {
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

    const quiz = await QuizTitle.create(
      { title: burns.title },
      { transaction },
    );
    for (const section of burns.sections) {
      const row = await QuizSection.create(
        { section: section.section, quizTitleId: quiz.id },
        { transaction },
      );
      await QuizQuestion.bulkCreate(
        section.questions.map((question) => ({
          question,
          quizSectionId: row.id,
        })),
        { transaction },
      );
    }
  });
  return true;
}
