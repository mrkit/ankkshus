const router = require('express').Router();
const { User } = require('../db').models;

router.get('/', (req, res, next) => {
  res.json({message:'Welcome new user!'});
})

router.post('/', (req, res, next)=> {
  const { username, password } = req.body;
  
  console.log('SignUp Req Body:', username, password);
  
  User.find({ where: { username , password }})
    .then(user => {
      if(user){
        console.log('This user already exits, go to login page');
      } else { 
        console.log('Created new user!')
        User.create({ username , password})
        .then(user=> res.send(user))
        .catch(err => console.log('error from signUp', err.message));
      }
    })
    .catch(err => console.log('error from user fine on signUp', err.message));
})

module.exports = router;