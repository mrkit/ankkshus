const Sequelize = require('sequelize');
/*const conn = new Sequelize( 'xneptmanhall-quizzes', 'xneptmanhall', 'JxsG;iMmf8^vxVxzC', { 
  host: 'MySQL.neptmanhall.com',
  dialect: 'mysql',
  logging: false, 
  operatorsAliases: false 
});
*/

const conn = new Sequelize('postgres://localhost/ankkshus', { logging: false, operatorsAliases: false});

//process.env.DATABASE_URL

module.exports = conn;
