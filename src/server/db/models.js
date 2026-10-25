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

// Never let the hash leave the server, whichever route serializes the row.
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
  date: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  article: { type: DataTypes.TEXT, allowNull: false },
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
});

export const QuizTitle = sequelize.define('quizTitle', {
  title: { type: DataTypes.STRING, allowNull: false },
});

export const QuizSection = sequelize.define('quizSection', {
  section: { type: DataTypes.STRING, allowNull: false },
});

export const QuizQuestion = sequelize.define('quizQuestion', {
  question: { type: DataTypes.TEXT, allowNull: false },
});

VideoChannel.hasMany(Video, { onDelete: 'CASCADE' });
Video.belongsTo(VideoChannel);

QuizTitle.hasMany(QuizSection, { onDelete: 'CASCADE' });
QuizSection.belongsTo(QuizTitle);
QuizSection.hasMany(QuizQuestion, { onDelete: 'CASCADE' });
QuizQuestion.belongsTo(QuizSection);
