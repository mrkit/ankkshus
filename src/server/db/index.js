const conn = require('./conn'),
      User = require('./User'),
      Quiz = require('./Quiz'),
      Video = require('./Video'),
      VideoChannels = require('./VideoChannels'),
      Post = require('./Post');

Quiz.belongsTo(User);
User.hasMany(Quiz);
VideoChannels.hasMany(Video);

const seed = () => {
  return VideoChannels.create({name: 'Crash Course Philosophy'})
  .then(channel => {
    console.log('Channel', channel.id);
    return Promise.all([
      Video.create({title: 'Episode 1', url: 'https://youtu.be/1A_CAkYt3GY', videochannelId: channel.id }),
      Video.create({title: 'Episode 2', url: 'https://youtu.be/NKEhdsnKKHs', videochannelId: channel.id }),
      Video.create({title: 'Episode 3', url: 'https://youtu.be/-wrCpLJ1XAw', videochannelId: channel.id }),
      Video.create({title: 'Episode 4', url: 'https://youtu.be/IV-8YsyghbU', videochannelId: channel.id }),
      Video.create({title: 'Episode 5', url: 'https://youtu.be/MLKrmw906TM', videochannelId: channel.id }),
      Video.create({title: 'Episode 6', url: 'https://youtu.be/5C-s4JrymKM', videochannelId: channel.id })
    ])
  })
  .then(() => {
    return Quiz.create({
      name: 'Burns Depression Checklist',
      titles: ['Thoughts and Feelings', 'Activities and Personal Relationships',
      'Physical Symptoms', 
      'Suicidal Urges**'],
      questions: [
        'Feeling sad or down in the dumps',
        'Feeling unhappy or blue',
        'Crying spells or tearfulness',
        'Feeling discouraged',
        'Feeling hopeless', 
        'Low self-esteem',
        'Feeling worthless or inadequate',
        'Guilt or shame',
        'Criticizing yourself or blaming yourself',
        'Difficulty making decisions'
      ]
    });
  });
};

module.exports = {
  conn,
  seed,
  models: {
    User, Quiz, Video, VideoChannels, Post
  }
}