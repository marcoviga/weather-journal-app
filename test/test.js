const app = require('../server');
const request = require('supertest');
require("datejs");


describe('/weather', function() {

    it('Post weather', done => {

       let weather = {
           "date": "6.14.2020",
           "temp": 40.5,
           "content": "good"
       };

       request(app)
            .post('/weather')
            .send(weather)
            .set('Content-Type', 'application/json')
            .expect(201, JSON.stringify(weather))
            .end(
                (err) => {
                if (err) return done(err);
                done();
            });
    });

    it('Get weather', done => {


        let weather = {
            "date": "6.14.2020",
            "temp": 40.5,
            "content": "good"
        };

        //TODO post weather but need to stub the object cached
        request(app)
            .post('/weather')
            .send(weather)
            .set('Content-Type', 'application/json')
            .expect(201, JSON.stringify(weather));

        //get weather
        request(app)
            .get('/weather')
            .set('Content-Type', 'application/json')
            .expect(200, JSON.stringify(weather))
            .end(
                (err) => {
                    if (err) return done(err);
                    done();
                });
    });

    it('Post invalid weather', done => {

        let weather = {
            "date": "notadate",
            "temp": "notatemperature",
            "content": 100
        };

        let expected = {
            "errors": [
                {
                    "value": "notadate",
                    "msg": "Invalid value",
                    "param": "date",
                    "location": "body"
                },
                {
                    "value": "notatemperature",
                    "msg": "Invalid value",
                    "param": "temp",
                    "location": "body"
                },
                {
                    "value": 100,
                    "msg": "Invalid value",
                    "param": "content",
                    "location": "body"
                }
            ]
        };

        request(app)
            .post('/weather')
            .send(weather)
            .set('Content-Type', 'application/json')
            .expect(422, JSON.stringify(expected))
            .end(
                (err) => {
                    if (err) return done(err);
                    done();
                });
    });

});