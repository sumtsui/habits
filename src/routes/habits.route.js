const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

// Get all habit titles
router.get('/all', (req, res, next) => {
  const habits = req.db.collection('habits');
  habits
    .find()
    .project({log: false})
    .toArray((err, docs) => {
      if (err) return next(err);
      res.send(docs);
    });
})

// Create new habit 
router.post('/new', (req, res, next) => {
  const habits = req.db.collection('habits');
  habits
    .insertOne({title: req.body.title})
    .then(() => {res.send(201)})
    .catch(next);
})

// Get single habit by ID
router.get('/:id', async (req, res, next) => {
  const habits = req.db.collection('habits');
  habits
    .findOne({_id: new ObjectID(req.params.id)})
    .then(doc => res.status(200).json(doc))
    .catch(next);
})

// Delete habit by ID
router.delete('/:id', (req, res, next) => {
  const habits = req.db.collection('habits');
  habits
    .findOneAndDelete({_id: new ObjectID(req.params.id)})
    .then(() => res.send(200))
    .catch(next);
})

// Edit habit title
router.put('/:id', (req, res, next) => {
  const habits = req.db.collection('habits');
  habits
    .findOneAndUpdate(
      {_id: new ObjectID(req.params.id)},
      {$set: { title: req.body.title }}
    )
    .then(() => res.send(200))
    .catch(next);
})

// Log a habit
router.post('/:id/records/new', (req, res, next) => {
  const habits = req.db.collection('habits');
  habits
    .updateOne(
      {_id: new ObjectID(req.params.id)},
      {$push: {log: new Date()}}
    )
    .then(() => res.send(201))
    .catch(next);
})

// Delete the most recent logging 
router.delete('/:id/records/', (req, res, next) => {
  const habits = req.db.collection('habits');
  habits
    .updateOne(
      {_id: new ObjectID(req.params.id)},
      {$pop: {log: 1}}
    )
    .then(() => res.send(200))
    .catch(next);
})

module.exports = router;

