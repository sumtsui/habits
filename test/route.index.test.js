const request = require('supertest');
let app = require('../src/app');

describe('home route', () => {
  
  describe('GET /', () => {

    it('should return a welcome message', () => {
      request(app)
        .get('/api')
        .expect('Content-Type', /json/)
        .expect(200, {
          message: 'Welcome to the Habit API'
        })
        // .end(function (err, res) {
        //   if (err) return done(err);
        //   done();
        // })
    });
  });
})


