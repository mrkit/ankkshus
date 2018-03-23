const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/ankkshus', { logging: false, operatorsAliases: false});

module.exports = conn;
