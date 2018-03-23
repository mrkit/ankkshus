const conn = require('./conn'),
      User = require('./User'),
      Quiz = require('./Quiz');

Quiz.belongsTo(User);
User.hasMany(Quiz);

module.exports = {
  conn,
  models: {
    User, Quiz
  }
}