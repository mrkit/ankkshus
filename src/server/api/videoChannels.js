const router = require('express').Router();
const VideoChannels = require('../db').models.VideoChannels;

router.get('/', (req, res, next) => {
  VideoChannels.findAll()
  .then(channels => res.send(channels))
  .catch(next);
});

module.exports = router;