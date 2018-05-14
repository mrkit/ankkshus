const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Video = conn.define('video', {
  title: Sequelize.STRING,
  url: { type: Sequelize.TEXT, validate: { isUrl: true } }
})

module.exports = Video;