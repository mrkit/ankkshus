const router = require('express').Router();
const { User } = require('../db').models;

router.post('/', (req, res, next) => {
  console.log('This is the form data', req.body);
  const name = req.body.username;
  const password = req.body.password
  
  User.find({ where: { name, password }})
    .then( user => {
    if(user){
      console.log('User found! Redirecting you to the home page')
//      res.redirect('/')
    } else {
      console.log('That user does not exist, you should register a new user.')
    }
  })
});


module.exports = router;