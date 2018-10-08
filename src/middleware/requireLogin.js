const jwt = require('jsonwebtoken');
const config = require('../../config');
const { newError } = require('../myfunc/');

function requiresLogin(req, res, next) {
  const token = req.header('habits-auth-token');
  if (!token) return next(newError(401, 'No token provided. Access denied. '));
  try {
    const decoded = jwt.verify(token, config.app.jwtPrivateKey);
    req.userID = decoded;
    next();
  } catch (ex) {
    return next(newError(400, 'Invaild token.'));
  }
}

module.exports = requiresLogin;