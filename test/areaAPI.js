'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');

chai.use(require('chai-http'));


const areaData = {
    name: "TestRoom",
    areaState: "Opened",
    owner: "pawel",
};

// THIS TOKEN MUST BE UPDATED TO MAKE TESTING WORKING PROPERLY
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYTUzMjZiMjIwMDA5Y2RkNDAwNjljZmIyMGE2MWVkOGRlM2U5ODcyMiIsImlhdCI6MTU1NTY4MDA4MywiZXhwIjoxNTU1NzY2NDgzfQ.aCwv1X5d7CIxJLGcAb3LNuDgLiNYZKYCQ22VSiZQv9U';


describe('Area - API Test', function() {
    it('Create Area', (done) => {
        request(app)
            .post('/api/v1/areas/create')
            .set('Content-Type', 'application/json')
            .set('authenticationToken', 'Bearer ' + token)
            .send(areaData)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).not.to.be.empty;
                //console.log(res.body);
                done();     
            });
    });

    it('Create Area (passed if fails)', (done) => {
        request(app)
            .post('/api/v1/areas/create')
            .set('Content-Type', 'application/json')
            .set('authenticationToken', 'Bearer' + token)
            .send(areaData)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).not.to.be.empty;
                //console.log(res.body);
                done();     
            });
    });

    // it('Retern areas', (done) => {
    //     request(app)
    // });

    // it('Retern areas (passed if fails)', (done) => {
    //     request(app)
    // });

    // it('Retern specific area', (done) => {
    //     request(app)
    // });

    // it('update specific area', (done) => {
    //     request(app)
    // });

    // it('delete specific area', (done) => {
    //     request(app)
    // });
});
