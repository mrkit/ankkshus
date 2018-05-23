const router = require('express').Router();
const { User } = require('../db').models;

router.post('/', (req, res, next) => {
  console.log('This is the form data', req.body);
  const name = req.body.username;
  const password = req.body.password
  
  if(User.isValidPassword(password)){
    User.find({ where: { name }})
    .then( user => {
      if(user){
        console.log('User found!')
        res.send(user);
      } else {
        res.send('That user does not exist, you should register a new user.')
      }
    })
  }
});


module.exports = router;