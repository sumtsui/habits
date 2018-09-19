const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');
const myfunc = require('../myfunc');

function db(req, res, next) {
  // DB Connection
  MongoClient.connect(config.db.url, {useNewUrlParser: true}, (err, client) => {
    if (err) next(err);
    else {
      myfunc.log('Successfully connect to database');
      const db = client.db(config.db.name);
      req.db = db;
      next();
    }
  });
}

module.exports = db;