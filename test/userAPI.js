'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');

chai.use(require('chai-http'));



// Credentials -------------------------------------------------------------
let resetpasswordCredentionals = {};

//let's set up the data we need to pass to the login method
const userCredentials = {
    username: 'pawel', 
    password: 'Welcome1234',
};

const newUserCredentials = {
  firstName: "Chris",
	lastName:"Brake",
	email: "chris@test.com",
	username: "chris",
	secretAnswer: "lol",
  password: "Welcome123",
  confirmPassword: "Welcome123"
}

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZvcm0iOiJtb2JpbGVhcHAiLCJ1c2VybmFtZSI6InBhd2VsIiwidXNlclR5cGUiOiJ1c2VyIiwiaXNWYWxpZCI6InRydWUifSwiaWF0IjoxNTUxODI1ODA2fQ.xvl3LPayaz-9u02m6N9JYc90fvc6i3ks5DPpI3vqwXw';

// After this test 
describe('Register User - API Test', function() {
  it('Should success if credential is valid', function(done) {
    request(app)
      .post('/api/v1/users/registration')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(newUserCredentials)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        //console.log(res.body);
        done();
      });
  }); 

  // This case will fail depends on the user already exists or not in the system
  it("User already exists in the system (fails as expected)", function (done) {
    request(app)
    .post('/api/v1/users/registration')
    .set('Content-Type', 'application/json')
    .send(newUserCredentials)
    .end((err, res) => {
      expect(res).to.have.status(400);
      //console.log(res.body);
      done();
    });
  });
});

describe('Login User - API Test', function() {
  it('Should success if credential is valid', function(done) {
    request(app)
      .post('/api/v1/users/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('authorizationToken', token)
      .send(userCredentials)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(response) {
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an('object');
      })
      .end(done);
  }); 
});

describe('Forget Password - API Test', () => {
  it('Reset password', (done) => {
    request(app)
      .post('/api/v1/users/resetpassword')
      .set('Content-Type', 'application/json')
      .send({email: "chris@test.com", secretAnswer: "lol"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).not.to.be.empty;
        resetpasswordCredentionals = res.body;
        //console.log(res.body);
        done();
      });
  });

  it('Set new password', (done) => {
    request(app)
      .put('/api/v1/users/newpassword')
      .set('Content-Type', 'application/json')
      .set('authenticationToken', 'Bearer ' + resetpasswordCredentionals.authenticationToken)
      .send({id: resetpasswordCredentionals.userId, password: "Welcome12345", confirmPassword: "Welcome12345"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        //console.log(res.body);
        done();
      });
  });

  it("Set new password (fails as expected)", function (done) {
    request(app)
    .post('/api/v1/users/newpassword')
    .set('Content-Type', 'application/json')
    .set('authenticationToken', 'Bearer ' + resetpasswordCredentionals.authenticationToken)
    .send({id: resetpasswordCredentionals.userId, password: "Welcome12345", confirmPassword: "Welcome1234"})
    .end((err, res) => {
      expect(res).to.have.status(404);
      //console.log(res.body);
      done();
    });
  });
});

