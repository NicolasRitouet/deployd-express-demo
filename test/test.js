var request = require('supertest'),
expect = require('chai').expect;
var express = require('../index').app;

describe('GET /contacts', function() {
  it('respond with json', function(done) {

    request(express)
      .get('/contacts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('display dashboard', function(){
  it('contains correct title', function(done) {

    request(express)
    .get('/dashboard/')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      expect(res.text).to.contain('<title>Deployd Dashboard</title>');
      done()
    });
  });
});
