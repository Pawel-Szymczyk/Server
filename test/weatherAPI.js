'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');

chai.use(require('chai-http'));

describe('Weather - API Test', function() {
    it('Should success if credential is valid', function(done) {
      request(app)
        .get('/api/v1/weather/info')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(response) {
          expect(response.body).not.to.be.empty;
          expect(response.body).to.be.an('object');
          //console.log(response.body);
        })
        .end(done);
    }); 
  });