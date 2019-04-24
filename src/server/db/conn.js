const Sequelize = require('sequelize');
const config = require('../../configs/node');
let conn;

if(process.env.NODE_ENV === 'development'){
  conn = new Sequelize('postgres://localhost/ankkshus', {logging:false});  
} else if(process.env.NODE_ENV === 'production'){
  const {db, user, db_password, settings} = require('../../../assets/.env.js');
  conn = new Sequelize(db, user, db_password, settings);
}

module.exports = conn;
