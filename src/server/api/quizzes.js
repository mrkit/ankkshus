const router = require('express').Router();
const { QuizTitles, QuizSections, QuizQuestions } = require('../db').models;

router.get('/title', (req, res, next) => {
  QuizTitles.findAll()
  .then(quiz => res.send(quiz[0].title))//temp for one quiz
  .catch(next);
});

router.get('/sections', (req, res, next) => {
  QuizSections.findAll()
  .then(sections => res.send(sections))
  .catch(next);
});

router.get('/questions', (req, res, next) => {
  QuizQuestions.findAll()
  .then(questions => res.send(questions))
  .catch(next);
});

module.exports = router;