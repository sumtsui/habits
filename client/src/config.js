// only use in splited delopyment
const env = process.env.NODE_ENV;
const devRoute = process.env.REACT_APP_HEROKU 
  ? '' 
  : 'http://localhost:3000';

const development = {
  route: devRoute
};

const test = {
  route: 'http://localhost:3000'
};

const production = {
  route: ''
};

const config = {
  development,
  test,
  production
};

module.exports = config[ env ];