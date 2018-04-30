const router = require('express').Router();
const { Video } = require('../db').models;

router.get('/youtube', (req, res, next) => {
  Video.findAll()
  .then(videos => res.send(videos))
  .catch(next);
})

router.post('/youtube', (req, res, next) => {
  const { title, url } = req.body;
  console.log('TITle', title, url)
  Video.create({title, url})
})

module.exports = router;