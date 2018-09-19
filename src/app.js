// Default enivironment to 'Development'
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const config = require('../config');
const express = require('express');
const myfunc = require('./myfunc');
const MongoClient = require('mongodb').MongoClient;

const indexRoute = require('./routes/index.route');
const habitRoute = require('./routes/habits.route');
const usersRoute = require('./routes/users.route');

// Server setup
const app = express();
const port = process.env.PORT || process.argv[2] || config.app.port
app.set('port', port);
app.use(express.json());
console.log('config', config);

// DB connection
let db;
MongoClient.connect(config.db.url, {useNewUrlParser: true}, (err, client) => {
  if (err) myfunc.log(err);
  else {
    console.log('Successfully connected to database ' + config.db.name);
    db = client.db(config.db.name);
  }
});

// Middleware make db avaialbe in req
app.use((req, res, next) => {
  req.db = db;
  next();
})

// Routes
app.use('/api', indexRoute);
app.use('/api/v1/habits', habitRoute);
app.use('/api/v1/users', usersRoute);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// Global error handler
app.use((err, req, res, next) => {
  // console.log(err);
  // if (err.name === 'ValidationError') err.status = 400;
  // if (err.name === 'CastError') {
  //   err.message = 'Course not found for given ID';
  //   err.status = 404;
  // }
  res.status(err.status || 500).json(err.message);
});

module.exports = app;



