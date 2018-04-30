const Sequelize = require('sequelize');
const {db, user, db_password, settings} = require('../../.env.js');
const conn = new Sequelize(db, user, db_password, settings);

module.exports = conn;
