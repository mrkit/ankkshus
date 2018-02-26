const router = require('express').Router();
const { User } = require('../db').models;

router.get('/', (req, res, next) => {
  res.json({message:'Welcome new user!'});
})

router.post('/', (req, res, next)=> {
  const name = req.body.username;
  const password = req.body.password;
  
  console.log('SignUp Req Body:', name, password)
  User.find({ where: { name , password }})
    .then(user => {
      if(user){
        console.log('This user already exits, go to login page');
      } else { 
        console.log('Created new user!')
        User.create({ name , password})
//          .then(()=> res.redirect('/google.com'));
      }
    })
    .catch(next);
})

module.exports = router;