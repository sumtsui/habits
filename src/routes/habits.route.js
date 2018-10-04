const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const requireLogin = require('../middleware/requireLogin');
const { log } = require('../myfunc');

// Make all habits routes require login
router.use(requireLogin);

// Get all habits
router.get('/all', async (req, res, next) => {
  const users = req.db.collection('users');
  users
    .findOne(
      { _id: ObjectID(req.session.userId) }, 
      { fields: { habits: true, _id: false } }
    )
    .then(habits => res.status(200).send(habits))
    .catch(next);
})

// Create new habit 
router.post('/new', async (req, res, next) => {
  const users = req.db.collection('users');
  log(req.body);
  users
    .updateOne(
      {_id: ObjectID(req.session.userId)},
      { $push: {
        habits: {
          title: req.body.title,
          _id: ObjectID(),
          records: [],
          isGood: req.body.isGood,
          pos: -1
        }
      }}
    )
    .then((r) => res.status(200).json({result: r.result}))
    .catch(next);
})

// Save changes (for now, only update pos)
router.put('/save-all', async (req, res, next) => {
  const { db, body, session } = req;
  const users = db.collection('users');
  const data = body.habits.map(({title, pos}) => ({ title, pos }));

  users
    .findOne({ _id: ObjectID(session.userId) }, { fields: { habits: 1, _id: 0 } })
    .then(({habits}) => {
      habits.forEach(habit => {
        // not comparing ObjectID here, they are really annoying and messy
        habit.pos = data.filter(d => ((d.title) === habit.title))[0].pos;
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
  const users = req.db.collection('users');
  users
    .updateOne(
      {_id: ObjectID(req.session.userId)},
      {
        $pull: { habits: { _id: ObjectID(req.params.id) } }
      }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

// Edit habit Title and isGood
router.put('/:id', (req, res, next) => {
  const users = req.db.collection('users');
  users
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
  const users = req.db.collection('users');
  users
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
  const users = req.db.collection('users');
  users
    .updateOne(
      { 'habits._id': ObjectID(req.params.id)},
      { $pop: { 'habits.$.records': 1 } }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

module.exports = router;

