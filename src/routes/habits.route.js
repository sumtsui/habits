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
      {_id: ObjectID(req.session.userId)}, 
      {fields: {habits: true, _id: false}}
    )
    .then(habits => res.status(200).send(habits))
    .catch(next);
})

// Create new habit 
router.post('/new', async (req, res, next) => {
  const users = req.db.collection('users');
  users
    .updateOne(
      {_id: ObjectID(req.session.userId)},
      { $push: {
        habits: {
          title: req.body.title,
          _id: new ObjectID
        }
      }}
    )
    .then((r) => res.status(200).json({result: r.result}))
    .catch(next);
})

// Get single habit by ID
// router.get('/:id', async (req, res, next) => {
//   const users = req.db.collection('users');
//   users
//     .find(
//       {_id: ObjectID(req.session.userId)},
//       {habits: {$elemMatch: 
//         {_id: ObjectID(req.params.id)}
//       }}
//     )
//     .then(doc => res.status(200).json(doc))
//     .catch(next);
// })

// Delete a habit
router.delete('/:id', (req, res, next) => {
  const users = req.db.collection('users');
  users
    .updateOne(
      {_id: ObjectID(req.session.userId)},
      {
        $pull: {
          habits: {
            _id: ObjectID(req.params.id),
          }
        }
      }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

// Edit habit title
router.put('/:id', (req, res, next) => {
// db.users.updateOne({'habits.title': 'weak up early'}, {'$set': {'habits.$.title': 'coding'}})
  const users = req.db.collection('users');
  users
    .updateOne(
      {'habits._id': ObjectID(req.params.id)},
      {
        $set: {
          'habits.$.title': req.body.title,
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
      {'habits._id': ObjectID(req.params.id)},
      {
        $push: {
          'habits.$.records': new Date(),
        }
      }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

// Delete the most recent recording 
router.delete('/:id/records/', (req, res, next) => {
  const users = req.db.collection('users');
  users
    .updateOne(
      {'habits._id': ObjectID(req.params.id)},
      {
        $pop: {
          'habits.$.records': 1,
        }
      }
    )
    .then(r => res.status(200).json({result: r.result}))
    .catch(next);
})

module.exports = router;

