const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Video = conn.define('video', {
  title: Sequelize.STRING,
  url: Sequelize.TEXT
})

module.exports = Video;