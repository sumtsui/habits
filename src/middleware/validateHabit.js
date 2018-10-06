const Joi = require('joi');
const { log, newError } = require('../myfunc');

const schema = Joi.object().keys({
  title: Joi.string().min(1).max(15).required(),
  isGood: Joi.number().min(0).max(1).required(),
  description: Joi.string().min(1).max(40),
})

function validateHabit(req, res, next) {
  Joi.validate(req.body, schema, (err, value) => { 
    if (err) {
      if (err.details[ 0 ].message.includes('isGood')) return next(newError(400, 'Please select "Good" or "Bad"'));
      return next(newError(400, err.details[0].message));
    } else {
      return next();
    }
  }); 
}

module.exports = validateHabit;