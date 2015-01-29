"use strict";

var express = require('express');
var http = require('http');

var PORT = process.env.PORT || 3000;
var ENV = process.env.NODE_ENV || 'development';

var MONGODB_HOST = process.env.WERCKER_MONGODB_HOST || 'localhost';
var MONGODB_PORT = process.env.WERCKER_MONGODB_PORT || 27017;
var MONGODB_DB = 'test-app';
var MONGODB_USERNAME = '';
var MONGODB_PASS = '';

// On Heroku, Mongolab add this variable to
if (process.env.MONGOLAB_URI) {
  var uriObject = require('mongodb-uri').parse(process.env.MONGOLAB_URI);
  MONGODB_HOST = uriObject.hosts[0].host;
  MONGODB_PORT = uriObject.hosts[0].port;
  MONGODB_DB = uriObject.database;
  MONGODB_USERNAME = uriObject.username;
  MONGODB_PASS = uriObject.password;
}

// setup express
var app = exports.app = express();
var server = http.createServer(app);

// Define a new route
app.get('/hello-express', function (req, res) {
  res.send('Hello World!');
});

// setup deployd
require('deployd').attach(server, {
  env: ENV,
  db: {
    host: MONGODB_HOST,
    port: MONGODB_PORT,
    name: MONGODB_DB,
    credentials: {
      username: MONGODB_USERNAME,
      password: MONGODB_PASS
    }
  }
});

// After attach, express can use server.handleRequest as middleware
app.use(server.handleRequest);

// start server
server.listen(PORT, function() {
  var serverAddr = server.address().address == '0.0.0.0' ? 'localhost' : server.address().address;
  console.log('Express & Deployd started.\n\nPlease visit http://%s:%s', serverAddr, server.address().port);
});
