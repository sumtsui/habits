const router = require('express').Router();
const bcrypt = require('bcrypt');
const { newError, log } = require('../myfunc');
const ObjectID = require('mongodb').ObjectID;
const validateLogin = require('../middleware/validateLogin');
const jwt = require('jsonwebtoken');
const config = require('../../config');

// Get current user
router.get('/', (req, res, next) => {
  req.db.collection('users')
    .findOne(
      {_id: new ObjectID(req.userID)},
      {fields: {password: false, _id: false }})
    .then(user => {
      if (user) return res.status(200).send(user);
      next(newError(400, 'Can not find current user'));
    })
    .catch(next);
})

// Check if confirmed-password matches password
function arePasswordsMatch(req, res, next) {
  if (req.body.password !== req.body.repeatPassword) {
    return next(newError(400, 'Two password inputs do not match'));
  }
  next();
}

// Check if email already exist  
function isEmailAvailable(req, res, next) {
  req.db.collection('users').findOne({email: req.body.email.toLowerCase()})
    .then(user => {
      if (user) return next(newError(400, 'This email has been registered'));
      res.locals.user = user;
      next();
    })
    .catch(next);
}

// Sign up (use validateLogin middleware as well for signup info validation)
router.post('/sign-up', validateLogin, arePasswordsMatch, isEmailAvailable, (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return next(err);
    req.db.collection('users')
      .insertOne({
        email: req.body.email.toLowerCase(),
        password: hash,
        habits: []
      })
      .then(result => {
        const id = result.ops[0]._id;
        const token = jwt.sign({ id }, config.app.jwtPrivateKey);
        res.status(200).json({ 'jwt': token })
      })
      .catch(next);
  })
})

// Check if user exist  
function isUserAlreadyExist(req, res, next) {
  req.db.collection('users').findOne({email: req.body.email.toLowerCase()})
    .then(user => {
      if (!user) return next(newError(400, 'User not found for given email'));
      res.locals.user = user;
      next();
    })
    .catch(next);
}

// Log in
router.post('/log-in', validateLogin, isUserAlreadyExist, (req, res, next) => {
  const {user} = res.locals;
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) return next(err);
    if (result === true) {
      const token = jwt.sign({ id: user._id }, config.app.jwtPrivateKey);
      res.status(200).json({ 'jwt': token })

    } else {
      next(newError(400, 'Incorrect password'));
    }
  })
})

module.exports = router;