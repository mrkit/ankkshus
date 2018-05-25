const router = require('express').Router();
const { Video } = require('../db').models;

router.get('/youtube', (req, res, next) => {
  Video.findAll()
  .then(videos => res.send(videos))
  .catch(err => console.log('Youtube GET error', err.message));
});

router.post('/youtube', (req, res, next) => {
  const { title, url } = req.body;
  Video.create({title, url})
  .then(video => res.send(video))
  .catch(err => console.log('Youtube POST error', err.message));
});

router.put('/youtube/:title', (req, res, next) => {
  const title = req.params.title;
  const renamedTitle = req.body.renamedTitle;
  
  Video.update({ title: renamedTitle }, { where: { title }})
  .then(thing => res.send(thing))
  .catch(err => console.log('Youtube PUT error', err.message))
});

router.delete('/youtube/:title', (req, res, next) => {
  const title = req.params.title;
  
  Video.destroy({where: {title}})
  .then(() => res.sendStatus(200))
  .catch(err => console.log('Youtube DELETE error', err.message))
});

module.exports = router;