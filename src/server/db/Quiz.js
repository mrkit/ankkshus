const conn = require('./conn'),
      Sequelize = conn.Sequelize;

//const Quiz = conn.define('quiz', {
//  name: Sequelize.STRING,
//  titles: Sequelize.ARRAY(Sequelize.TEXT),
//  questions: Sequelize.ARRAY(Sequelize.TEXT),
//  score: Sequelize.INTEGER
//});

const QuizTitles = conn.define('quiztitle', {
  title: Sequelize.STRING
});

const QuizSections = conn.define('quizsection', {
  section: Sequelize.STRING
});

const QuizQuestions = conn.define('quizquestion', {
  question: Sequelize.TEXT,
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

QuizTitles.hasMany(QuizSections);
QuizSections.hasMany(QuizQuestions);
QuizSections.belongsTo(QuizTitles);
QuizQuestions.belongsTo(QuizSections);

module.exports = { QuizTitles, QuizSections, QuizQuestions };