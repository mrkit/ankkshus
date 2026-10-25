import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// The hash stays on the server, whichever route serializes the row.
User.prototype.toJSON = function toJSON() {
  return { id: this.id, username: this.username, createdAt: this.createdAt };
};

User.prototype.checkPassword = function checkPassword(plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

User.hashPassword = function hashPassword(plain) {
  return bcrypt.hash(plain, 12);
};

export const Post = sequelize.define('post', {
  title: { type: DataTypes.STRING, allowNull: false },
  article: { type: DataTypes.TEXT, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

export const VideoChannel = sequelize.define('videoChannel', {
  name: { type: DataTypes.STRING, allowNull: false },
});

export const Video = sequelize.define('video', {
  title: { type: DataTypes.STRING, allowNull: false },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { isUrl: true },
  },
  addedById: { type: DataTypes.INTEGER, allowNull: true },
});

// A quiz is either a repeatable checklist scored 0 to 4 per item (the Burns
// checklist) or a worksheet of written reflections (the CBT course sections).
export const Quiz = sequelize.define('quiz', {
  slug: { type: DataTypes.STRING(64), allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  kind: { type: DataTypes.ENUM('checklist', 'worksheet'), allowNull: false },
  summary: { type: DataTypes.TEXT, allowNull: true },
  source: { type: DataTypes.STRING, allowNull: true },
  videoUrl: { type: DataTypes.TEXT, allowNull: true },
  videoTitle: { type: DataTypes.STRING, allowNull: true },
  order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

export const QuizSection = sequelize.define('quizSection', {
  title: { type: DataTypes.STRING, allowNull: false },
  intro: { type: DataTypes.TEXT, allowNull: true },
  order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

export const QuizQuestion = sequelize.define('quizQuestion', {
  prompt: { type: DataTypes.TEXT, allowNull: false },
  help: { type: DataTypes.TEXT, allowNull: true },
  type: { type: DataTypes.ENUM('scale', 'text', 'longtext'), allowNull: false },
  order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

export const QuizAttempt = sequelize.define('quizAttempt', {
  total: { type: DataTypes.INTEGER, allowNull: true },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export const QuizAnswer = sequelize.define('quizAnswer', {
  score: { type: DataTypes.INTEGER, allowNull: true },
  text: { type: DataTypes.TEXT, allowNull: true },
});

User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Video, { foreignKey: 'addedById', as: 'videos' });
Video.belongsTo(User, { foreignKey: 'addedById', as: 'addedBy' });

VideoChannel.hasMany(Video, { onDelete: 'CASCADE' });
Video.belongsTo(VideoChannel);

Quiz.hasMany(QuizSection, { as: 'sections', onDelete: 'CASCADE' });
QuizSection.belongsTo(Quiz);
QuizSection.hasMany(QuizQuestion, { as: 'questions', onDelete: 'CASCADE' });
QuizQuestion.belongsTo(QuizSection);

Quiz.hasMany(QuizAttempt, { as: 'attempts', onDelete: 'CASCADE' });
QuizAttempt.belongsTo(Quiz);
User.hasMany(QuizAttempt, { as: 'attempts' });
QuizAttempt.belongsTo(User);
QuizAttempt.hasMany(QuizAnswer, { as: 'answers', onDelete: 'CASCADE' });
QuizAnswer.belongsTo(QuizAttempt);
QuizAnswer.belongsTo(QuizQuestion, { as: 'question' });
QuizQuestion.hasMany(QuizAnswer, { onDelete: 'CASCADE' });
