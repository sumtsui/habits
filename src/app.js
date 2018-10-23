// Default enivironment to 'Development'
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
// Import modules
const config = require('../config');
const express = require('express');
const { log, newError } = require('./myfunc');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const cookieParser = require('cookie-parser')
// Import routes
const indexRoute = require('./routes/index.route');
const habitRoute = require('./routes/habits.route');
const usersRoute = require('./routes/users.route');

// Server setup
const app = express();
const port = process.env.PORT || process.argv[2] || config.app.port

app.set('port', port);
app.use(express.json());
app.use(cookieParser());

// // cater CROS preflxght request
app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Jwt");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.status(200).end();
});

// // Allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

log('config', config.db);

// DB connection
MongoClient.connect(config.db.mlab_url, {useNewUrlParser: true}, (err, client) => {
  let db;
  if (err) log(err);
  else {
    log('Successfully connected to database ' + config.db.mlab_name);
    db = client.db(config.db.mlab_name);
  }

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
    res.status(err.status || 500).json({error: err.message});
  });

  // Serve client built files when deployed to Heroku.
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

});

module.exports = app;



