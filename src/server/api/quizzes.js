const router = require('express').Router();
const Quiz = require('../db').models.Quiz;

router.get('/', (req, res, next) => {
  Quiz.findAll()
  .then(quiz => res.send(quiz))
  .catch(next);
});

module.exports = router;