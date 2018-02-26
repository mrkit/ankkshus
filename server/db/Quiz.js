const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Quiz = conn.define('quiz', {
  totalScore: Sequelize.INTEGER
})

module.exports = Quiz;