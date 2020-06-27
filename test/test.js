

const app = require('../server');
const request = require('supertest');
const chai = require('chai');

describe('/weather',  done => {
    it('Post weather', done => {
       let weather = {
           "date": "2020-01-20",
           "temperature": 2,
           "content": "good"
       }

        request(app).post('/weather')
            .send(weather)
            .set('Content-Type', 'application/json')
            .expect(200, JSON.stringify(weather))
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});