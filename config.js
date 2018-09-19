// require('dotenv').config();

const env = process.env.NODE_ENV;

const development = {
  db: {
    url: 'mongodb://localhost:27017',
    name: 'habit-api'
  },
  app: {
    port: 3000
  }
};

const test = {
  db: {
    url: 'mongodb://localhost:27017',
    name: 'habit-api-test'
  },
  app: {
    port: 3333
  }
}

const config = {
  development,
  test
};

module.exports = config[env];