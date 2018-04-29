const db_password = require('../secrets.js').db_password;
// dev => 'postgres://localhost/slldb2', { logging: false, operatorsAliases: false };
const Sequelize = require('sequelize');
const conn = new Sequelize('postgres',  'mrkit', db_password,  { 
	logging: false,
	operatorsAliases: false, 
	dialect: 'postgres', 
	host: 'nphdb.cyzisvadgbvt.us-east-1.rds.amazonaws.com' 
});

module.exports = conn;
