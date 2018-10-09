const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const requireLogin = require('../middleware/requireLogin');
const validateHabit = require('../middleware/validateHabit');
const { log, newError } = require('../myfunc');

// Make all habits routes require login
router.use(requireLogin);

// Check if habit title already exist  
function isTitleAvailable(req, res, next) {
  req.db.collection('users')
    .findOne(
      { _id: ObjectID(req.userID) }, 
      { fields: { habits: true, _id: false } }
    )
    .then(({ habits }) => {
      if (habits.filter(h => h.title === req.body.title.toLowerCase()).length > 0) {
        return next(newError(400, 'Habit already exists'));
      }
      next();
    })
    .catch(next);
}

// Get all habits
router.get('/all', async (req, res, next) => {
  req.db.collection('users')
    .findOne(
      { _id: ObjectID(req.userID) }, 
      { fields: { habits: true, _id: false } }
    )
    .then(habits => {
      res.status(200).send(habits)
    })
    .catch(next);
})

// Create new habit 
router.post('/new', validateHabit, isTitleAvailable, (req, res, next) => {
  req.db.collection('users')
    .updateOne(
      {_id: ObjectID(req.userID)},
      { $push: {
        habits: {
          title: req.body.title.toLowerCase(),
          _id: ObjectID(),
          records: [],
          isGood: req.body.isGood,
          pos: 1000 // new habit at bottom
        }
      }}
    )
    .then((r) => res.status(200).json({result: r.result}))
    .catch(next);
})

// Save changes (for now, only update pos)
router.put('/save-all', async (req, res, next) => {
  const { db, body, userID } = req;
  const users = db.collection('users');
  // only keep title and pos from req.body
  const data = body.habits.map(({title, pos}) => ({ title, pos }));

  users
    .findOne({ _id: ObjectID(userID) }, { fields: { habits: 1, _id: 0 } })
    .then(({habits}) => {
      habits.forEach(habit => {
        // not comparing ObjectID here, they are really annoying and messy
        habit.pos = data.filter(d => (d.title.toLowerCase() === habit.title))[0].pos;
        users.updateOne(
          { 'habits._id': ObjectID(habit._id) },
          { $set: { 'habits.$.pos': habit.pos } }
        )
      })
    })
    .then(() => res.status(200).json({ result: 'saved' }))
    .catch(next)
})

// Delete a habit
router.delete('/:id', (req, res, next) => {
  req.db.collection('users')
    .updateOne(
      {_id: ObjectID(req.userID)},
      {
        $pull: { habits: { _id: ObjectID(req.params.id) } }
      }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

// Edit habit Title and isGood
router.put('/:id', (req, res, next) => {
  req.db.collection('users')
    .updateOne(
      { 'habits._id': ObjectID(req.params.id)},
      {
        $set: {
          'habits.$.title': req.body.title,
          'habits.$.isGood': req.body.isGood
        }
      }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

// Record 'did it'
router.post('/:id/records/new', (req, res, next) => {
  req.db.collection('users')
    .updateOne(
      { "habits._id": ObjectID(req.params.id) },
      { $push: { 'habits.$.records': new Date() } }
    )
    .then(r => {
      res.status(200).json({result: r.result})
    })
    .catch(next);
})

// Undo 'did it'
router.delete('/:id/records/', (req, res, next) => {
  req.db.collection('users')
    .updateOne(
      { 'habits._id': ObjectID(req.params.id)},
      { $pop: { 'habits.$.records': 1 } }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

module.exports = router;

