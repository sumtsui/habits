const request = require('supertest');
const app = require('../src/app');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

describe('/habits', () => {
  beforeAll(() => {
    
  });
  afterAll(() => {

  });
  describe('GET /all', () => {
    it('should return all habits in json', done => {
      request(app)
        .get('/api/v1/habits/all')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        })
    })
  })
})