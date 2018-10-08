const router = require('express').Router();

router.get('/', (req, res) => {
  // res.json({
  //   message: 'Welcome to the Habit API'
  // })
  res.set({
    'x-auth-token': 'fuck',
    'Location': '/'
  }).send(200);
})

module.exports = router;