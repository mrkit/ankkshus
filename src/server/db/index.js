const conn = require('./conn'),
      User = require('./User'),
      Quiz = require('./Quiz'),
      Video = require('./Video');

Quiz.belongsTo(User);
User.hasMany(Quiz);

const seed = () => {
  return Promise.all([
    Video.create({title: 'Episode 1', url: 'https://youtu.be/1A_CAkYt3GY' }),
    Video.create({title: 'Episode 2', url: 'https://youtu.be/NKEhdsnKKHs'}),
    Video.create({title: 'Episode 3', url: 'https://youtu.be/-wrCpLJ1XAw'}),
    Video.create({title: 'Episode 4', url: 'https://youtu.be/IV-8YsyghbU'}),
    Video.create({title: 'Episode 5', url: 'https://youtu.be/MLKrmw906TM'}),
    Video.create({title: 'Episode 6', url: 'https://youtu.be/5C-s4JrymKM'})
  ])
}

module.exports = {
  conn,
  seed,
  models: {
    User, Quiz, Video
  }
}