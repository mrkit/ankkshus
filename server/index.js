const express = require('express'),
      server = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      resolve = require('path').resolve,
      db = require('./db');


server.use(express.static(resolve(__dirname, '..', 'client', 'public')));
server.use('/vendor', express.static(resolve(__dirname, '..', 'node_modules')));

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(require('compression')());

server.get('/luci', (req, res, next) => res.sendFile(resolve(__dirname, '..', 'client', 'public', 'luci.html')));
server.get('/*', (req, res, next) => res.sendFile(resolve(__dirname, '..', 'client', 'public', 'index.html')));

server.use('/api', require('./api'));

server.use((err, req, res, next) => err && console.log(`Server Error: ${err.message}`))

const port = process.env.PORT || 3000;

db.conn.sync({ force: true })
.then(() => server.listen(port, '127.0.0.1', console.log(`listening on port ${port}`)));
