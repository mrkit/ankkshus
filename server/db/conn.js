const Sequelize = require('sequelize');
const config = require('../config');
//const {db, user, db_password, settings} = require('../../.env.js');
//const conn = new Sequelize(db, user, db_password, settings);
//console.log(config.db.user);

const conn = new Sequelize('postgres://localhost/ankkshus', {logging:false,operatorsAliases:false});

module.exports = conn;
