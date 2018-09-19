const router = require('express').Router();
const bcrypt = require('bcrypt');

// Sign up
// need to have confirmed password field!!!
router.post('/sign-up', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return next(err);
    req.db.collection('users')
      .insertOne({
        email: req.body.email,
        password: hash
      })
      .then(() => res.sendStatus(201))
      .catch(next);
  })
})

// Check if email exist  
router.use('/log-in', (req, res, next) => {
  req.db.collection('users')
    .findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        const err = new Error('User not found for given email');
        err.status = 400;
        return next(err);
      }
      res.locals.user = user;
      next();
    })
    .catch(next);
})

// Attempt to Log in
router.post('/log-in', (req, res, next) => {
  const {user} = res.locals;
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) return next(err);
    if (result === true) {
      // req.session.userId = user._id;
      res.sendStatus(200);
    } else {
      const err = new Error('Incorrect password');
      err.status = 400;
      next(err);
    }
  })
})

module.exports = router;