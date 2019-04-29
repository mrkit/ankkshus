const conn = require('./conn'),
      User = require('./User'),
      { QuizTitles, QuizSections, QuizQuestions } = require('./Quiz'),
      Video = require('./Video'),
      VideoChannels = require('./VideoChannels'),
      Post = require('./Post');

QuizTitles.belongsTo(User);
User.hasMany(QuizTitles);
VideoChannels.hasMany(Video);
Video.belongsTo(VideoChannels);

let seed = () => {
  VideoChannels.create({name: 'Crash Course Philosophy'})
  .then(channel => {
    return Promise.all([
      Video.create({title: 'Episode 1', url: 'https://youtu.be/1A_CAkYt3GY', videochannelId: channel.id }),
      Video.create({title: 'Episode 2', url: 'https://youtu.be/NKEhdsnKKHs', videochannelId: channel.id }),
      Video.create({title: 'Episode 3', url: 'https://youtu.be/-wrCpLJ1XAw', videochannelId: channel.id }),
      Video.create({title: 'Episode 4', url: 'https://youtu.be/IV-8YsyghbU', videochannelId: channel.id }),
      Video.create({title: 'Episode 5', url: 'https://youtu.be/MLKrmw906TM', videochannelId: channel.id }),
      Video.create({title: 'Episode 6', url: 'https://youtu.be/5C-s4JrymKM', videochannelId: channel.id })
    ])
  }).catch(err => console.log(err.message));
  
  return QuizTitles.create({ title: 'Burns Depression Checklist'})
    .then(quiz => {
      return Promise.all([
        QuizSections.create({ section: 'Thoughts and Feelings', quiztitleId: quiz.id }).then(section => {
          return Promise.all([
            QuizQuestions.create({ question: 'Feeling sad or down in the dumps', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Feeling unhappy or blue', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Crying spells or tearfulness', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Feeling discouraged', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Feeling hopeless', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Low self-esteem', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Feeling worthless or inadequate', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Guilt or shame', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Criticizing yourself or blaming others', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Difficulty making decisions', quizsectionId: section.id })
          ])
        }),
        QuizSections.create({ section: 'Activities and Personal Relationships', quiztitleId: quiz.id }).then(section => {
          return Promise.all([
            QuizQuestions.create({ question: 'Loss of interest in family, friends or colleagues', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Loneliness', quizsectionId: section.id }),QuizQuestions.create({ question: 'Spending less time with family or friends', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Loss of motivation', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Loss of interest in work or other activities', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Avoiding work or other activities', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Loss of pleasure or satisfaction in life', quizsectionId: section.id })
          ])
        }),
        QuizSections.create({ section: 'Physical Syptoms', quiztitleId: quiz.id }).then(section => {
          return Promise.all([
            QuizQuestions.create({ question: 'Feeling tired', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Difficulty sleeping or sleeping too much', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Decreased or increased appetite', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Loss of interest in sex', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Worrying about your health', quizsectionId: section.id })
          ])
        }),
        QuizSections.create({ section: 'Suicidal Urges**', quiztitleId: quiz.id }).then(section => {
          return Promise.all([
            QuizQuestions.create({ question: 'Do you have any suicidal thoughts?', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Would you like to end your life?', quizsectionId: section.id }),
            QuizQuestions.create({ question: 'Do you have a plan for harming yourself?', quizsectionId: section.id })
          ])
        })
      ])
    }).catch(err => console.log(err.message));

  
      
};

//   seed: process.env.NODE_ENV === 'development' ? seed : () => console.log('No seed on production build') // try seeding again..


  module.exports = {
    conn,
    seed,
    models: {
      User, QuizTitles, QuizSections, QuizQuestions, Video, VideoChannels, Post
    }
  };