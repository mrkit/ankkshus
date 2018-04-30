const express = require('express'),
      server = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      resolve = require('path').resolve,
      db = require('./db');

server.use(express.static(resolve(__dirname, '..', 'dist')));
server.use('/vendor', express.static(resolve(__dirname, '..', 'node_modules')));

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(require('compression')());

server.use('/api', require('./api'));
server.get('/luci', (req, res, next) => res.sendFile(resolve(__dirname, '..', 'dist', 'phaser', 'luci.html')));
server.get('/*', (req, res, next) => res.sendFile(resolve(__dirname, '..', 'dist', 'index.html')));


server.use((err, req, res, next) => err && console.log(`Server Catch-All Error: ${err.message}`))

db.conn.sync({ force: true })
.then(() => db.seed())
.then(() => server.listen(3000, '127.0.0.1', console.log('listening on port 3000')));
