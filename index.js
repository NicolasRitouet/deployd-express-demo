"use strict";

var PORT = process.env.PORT || 3000;
var ENV = process.env.NODE_ENV || 'development';

// setup express
var express = require('express');
var app = exports.app = express();
var server = require('http').createServer(app);


app.get('/', function (req, res) {
  res.send('Hello World!')
});

// setup deployd
require('deployd').attach(server, {
  env: ENV,
  db: {host:'localhost', port:27017, name:'test-app'}
});

// After attach, express can use server.handleRequest as middleware
app.use(server.handleRequest);

// start server
server.listen(PORT, function() {
  console.log('Express & Deployd listening at http://%s:%s', server.address().address, server.address().port)
});
