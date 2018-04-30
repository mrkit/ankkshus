const conn = require('./conn'),
      User = require('./User'),
      Quiz = require('./Quiz'),
      Video = require('./Video');

Quiz.belongsTo(User);
User.hasMany(Quiz);

const seed = () => {
  Promise.all([
    Video.create({title: 'Episode 1', url: 'https://www.youtube.com/embed/1A_CAkYt3GY' }),
    Video.create({title: 'Episode 2', url: 'https://www.youtube.com/embed/NKEhdsnKKHs'}),
    Video.create({title: 'Episode 3', url: 'https://www.youtube.com/embed/1A_CAkYt3GY'}),
    Video.create({title: 'Episode 4', url: 'https://www.youtube.com/embed/IV-8YsyghbU'}),
    Video.create({title: 'Episode 5', url: 'https://www.youtube.com/embed/MLKrmw906TM'}),
    Video.create({title: 'Episode 6', url: 'https://www.youtube.com/embed/5C-s4JrymKM?rel=0'})
  ])
}

module.exports = {
  conn,
  seed,
  models: {
    User, Quiz, Video
  }
}