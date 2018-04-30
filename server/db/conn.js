const Sequelize = require('sequelize');
var conn;

if(require('../../webpack.config.js').mode === 'development'){
  conn = new Sequelize('postgres://localhost/ankkshus', { logging: false, operatorsAliases: false })
} else {
  const {db, user, db_password, settings} = require('../../.env.js');
  conn = new Sequelize(db, user, db_password, settings);
}

module.exports = conn;
