// only use in splited delopyment
const env = process.env.NODE_ENV;
const devRoute = process.env.REACT_APP_HEROKU ? 'https://habits-backend.herokuapp.com' : 'http://localhost:3000';

const development = {
  route: devRoute
};

const test = {
  route: 'http://localhost:3000'
};

const production = {
  route: 'http://localhost:3000'
};

const config = {
  development,
  test,
  production
};

module.exports = config[ env ];