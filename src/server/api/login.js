const router = require('express').Router();
const { User } = require('../db').models;

router.post('/', (req, res, next) => {
  console.log('This is the form data', req.body);
  const { username, password } = req.body;
  
  //you don't need { where: }, { username } alone will work
  User.findOne({ where: { username }})
    .then( user => {
      if(user){
        console.log('User found!')
        User.isValidPassword(password)
          .then(correctPw => {
              if(correctPw){
                console.log('This should be correct', correctPw);
                res.send(user);
              } else {
                res.send('Wrong Password');
              }
          })
      } else {
        res.send('That user does not exist, you should register a new user.')
      }
    })
});


module.exports = router;