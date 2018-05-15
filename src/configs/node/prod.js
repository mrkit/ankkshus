const {db, user, db_password, settings} = require('../../../assets/.env.js');


module.exports = {
  db: {
    db,
    user,
    db_password,
    settings,
    force: false
  }
}