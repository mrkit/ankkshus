const router = require('express').Router();
const { Video } = require('../db').models;

router.get('/youtube', (req, res, next) => {
  Video.findAll()
  .then(videos => res.send(videos))
  .catch(next);
})

router.post('/youtube', (req, res, next) => {
  const { title, url } = req.body;
  Video.create({title, url})
  .then(video => res.send(video))
  .catch(err => console.log('Youtube error', err.message));
})

module.exports = router;