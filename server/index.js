const express = require('express'),
      server = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      join = require('path').join,
      db = require('./db');


server.use(express.static(join(__dirname, '..', 'client', 'public')));
server.use('/vendor', express.static(join(__dirname, '..', 'node_modules')));

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(require('compression')());

server.get('/*', (req, res, next) => res.sendFile(join(__dirname, '..', 'client', 'public', 'index.html')));

server.get('/luci', (req, res, next) => res.sendFile(join(__dirname, '..', 'client', 'public', 'luci.html')));

server.use('/api', require('./api'));

server.use((err, req, res, next) => err && console.log(`Server Error: ${err.message}`))

const port = process.env.PORT || 3000;

server.listen(port, "127.0.0.1", console.log(`listening on port ${port}`));
