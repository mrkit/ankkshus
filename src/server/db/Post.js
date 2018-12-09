const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Post = conn.define('post', {
  title: Sequelize.STRING,
  date: Sequelize.STRING,
  author: Sequelize.STRING,
  article: Sequelize.TEXT
});

module.exports = Post;