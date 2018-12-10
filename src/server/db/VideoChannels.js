const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Video = require('./Video');

const VideoChannels = conn.define('videochannel', {
  name: Sequelize.STRING
});


module.exports = VideoChannels;