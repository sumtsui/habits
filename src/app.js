// Default enivironment to 'Development'
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
// Import modules
const config = require('../config');
const express = require('express');
const { log, newError } = require('./myfunc');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// Import routes
const indexRoute = require('./routes/index.route');
const habitRoute = require('./routes/habits.route');
const usersRoute = require('./routes/users.route');

// Server setup
const app = express();
const port = process.env.PORT || process.argv[2] || config.app.port
app.set('port', port);
app.use(express.json());

log('config', config);

// DB connection
MongoClient.connect(config.db.url, {useNewUrlParser: true}, (err, client) => {
  let db;
  if (err) myfunc.log(err);
  else {
    console.log('Successfully connected to database ' + config.db.name);
    db = client.db(config.db.name);
  }


  //use sessions for tracking logins
  app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    // Save session in DB
    store: new MongoStore({db: db})
  }));

  // Make DB instance avaialbe in req
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
    log(err);
    res.status(err.status || 500).json(err.message);
  });

});

module.exports = app;



