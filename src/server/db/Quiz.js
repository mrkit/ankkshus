const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Quiz = conn.define('quiz', {
  title: Sequelize.STRING,
  subTitle: Sequelize.STRING,
  number: Sequelize.INTEGER,
  question: Sequelize.TEXT,
  totalScore: Sequelize.INTEGER
})

module.exports = Quiz;