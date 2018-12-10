const router = require('express').Router();
const Post = require('../db').models.Post;

router.get('/', (req, res, next) => {
  Post.findAll()
  .then(posts => res.send(posts.reverse()))
  .catch(next);
});

router.post('/', (req, res, next) => {
  const { title, date, author, article } = req.body;
  
  Post.create({title, date, author, article })
  .then(post => res.send(post))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, date, article } = req.body;

  Post.update({ title, date, article }, { where: { id }})
  .then(updatedPost => res.send(updatedPost))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Post.destroy({ where: { id }})
  .then(() => res.send(id))
  .catch(next);
});

module.exports = router;