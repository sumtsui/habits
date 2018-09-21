const router = require('express').Router();
const bcrypt = require('bcrypt');
const { newError, log } = require('../myfunc');
const ObjectID = require('mongodb').ObjectID;

// Get current user
// router.get('/', (req, res, next) => {
//   log('req.session.userId', req.session.userId);
//   req.db.collection('users')
//     .findOne(
//       {_id: new ObjectID(req.session.userId)},
//       {fields: {password: false, _id: false }})
//     .then(user => {
//       if (user) return res.status(200).send(user);
//       next(newError(400, 'Can not find current user'));
//     })
//     .catch(next);
// })

// Check if confirmed-password matches password
function arePasswordsMatch(req, res, next) {
  if (req.body.password !== req.body.confPassword) {
    return next(newError(400, 'Two password inputs do not match'));
  }
  next();
}

// Check if email already exist  
function isEmailAvailable(req, res, next) {
  req.db.collection('users').findOne({email: req.body.email})
    .then(user => {
      if (user) return next(newError(400, 'This email has been registered'));
      res.locals.user = user;
      next();
    })
    .catch(next);
}

// Sign up
router.post('/sign-up', arePasswordsMatch, isEmailAvailable, (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return next(err);
    req.db.collection('users')
      .insertOne({
        email: req.body.email,
        password: hash
      })
      .then(user => {
        req.session.userId = user._id;
        res.sendStatus(201);
      })
      .catch(next);
  })
})

// Check if user exist  
function isUserAlreadyExist(req, res, next) {
  req.db.collection('users').findOne({email: req.body.email})
    .then(user => {
      if (!user) return next(newError(400, 'User not found for given email'));
      res.locals.user = user;
      next();
    })
    .catch(next);
}

// Log in
router.post('/log-in', isUserAlreadyExist, (req, res, next) => {
  const {user} = res.locals;
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) return next(err);
    if (result === true) {
      req.session.userId = user._id;
      res.sendStatus(200);
    } else {
      next(newError(400, 'Incorrect password'));
    }
  })
})

// Logout
router.get('/log-out', (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) return next(err);
      res.sendStatus(200);
    });
  }
});

module.exports = router;