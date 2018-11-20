const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Quiz = conn.define('quiz', {
  name: Sequelize.STRING,
  titles: Sequelize.ARRAY(Sequelize.TEXT),
  questions: Sequelize.ARRAY(Sequelize.TEXT),
  score: Sequelize.INTEGER
});

//other columns may be needed, like:
//question number grouping sequelize array of numbers. How many questions per title.

module.exports = Quiz;