const router = require('express').Router();
const { Video } = require('../db').models;

router.get('/youtube', (req, res, next) => {
  Video.findAll()
  .then(videos => res.send(videos))
  .catch(next);
});

router.post('/youtube', (req, res, next) => {
  const { title, url } = req.body;
  Video.create({title, url})
  .then(video => res.send(video))
  .catch(err => console.log('Youtube post error', err.message));
});

router.put('/youtube/:title', (req, res, next) => {
  const title = req.params.title;
  const renamedTitle = req.body.renamedTitle;
  
  Video.update({ title: renamedTitle }, { where: { title }})
  .then(thing => res.send(thing))
  .catch(err => console.log('Youtube put error', err.message))
});

router.delete('/youtube/:title', (req, res, next) => {
  const title = req.params.title;
  
  Video.destroy({where: {title}})
  .then(() => res.sendStatus(200))
  .catch(err => console.log('Youtube delete error', err.message))
});

module.exports = router;