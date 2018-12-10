const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const VideoChannels = require('./VideoChannels');

const Video = conn.define('video', {
  title: Sequelize.STRING,
  url: { type: Sequelize.TEXT, validate: { isUrl: true } }
});

Video.belongsTo(VideoChannels);

module.exports = Video;