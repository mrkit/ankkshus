const conn = require('./conn'),
      Sequelize = conn.Sequelize,
      bcrypt = require('bcrypt');

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate(user, options){
      if(user){
        return bcrypt.genSalt(12)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hashedPW => user.password = hashedPW)
        .then(hashedPW => this.password = hashedPW)
        .catch(err => console.log(`beforeCreate error message: ${err.message}`));
      }
    }
  }
});

User.isValidPassword = function(passwordEntered){
  return bcrypt.compare(passwordEntered, this.password)//will return true of false
  .then(isCorrectPW => {
    console.log(`Is the password correct? ${isCorrectPW}`);
    return isCorrectPW;
  })
  .catch(err => console.log(`Validation Error: ${err.message}`))
}

module.exports = User;
