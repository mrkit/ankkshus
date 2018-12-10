const r = require('express').Router();
const Post = require('../db').models.Post;

r.get('/', (req, res, next) => {
  Post.findAll()
  .then(posts => res.send(posts.reverse()))
  .catch(next);
});

r.post('/', (req, res, next) => {
  const { title, date, author, article } = req.body;
  
  Post.create({title, date, author, article })
  .then(post => res.send(post))
  .catch(next);
});

module.exports = r;