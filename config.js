require('dotenv').config();

const env = process.env.NODE_ENV;

const development = {
  db: {
    mlab_url: process.env.HABIT_API_MLAB_URL,
    mlab_name: 'habits',
    local_url: 'mongodb://localhost:27017',
    local_name: 'habit-api',
  },
  app: {
    port: 3000,
    secret: process.env.HABIT_API_SECRET,
    allowedOrigin: 'http://localhost:3001'
  },
};

const production = {
  db: {
    mlab_url: process.env.HABIT_API_MLAB_URL,
    mlab_name: 'habits',
    local_url: 'mongodb://localhost:27017',
    local_name: 'habit-api',
  },
  app: {
    port: 3000,
    secret: process.env.HABIT_API_SECRET,
    allowedOrigin: 'http://habit-logging-app.herokuapp.com'
  },
};

const test = {
  db: {
    mlab_url: process.env.HABIT_API_MLAB_URL,
    local_url: 'mongodb://localhost:27017',
    name: 'habit-api-test'
  },
  app: {
    port: 3333,
    secret: process.env.HABIT_API_SECRET,
  },
}

const config = {
  development,
  test,
  production
};

module.exports = config[env];