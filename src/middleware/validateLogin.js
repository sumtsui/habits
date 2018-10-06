const Joi = require('joi');
const { log, newError } = require('../myfunc');

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().min(3).max(30).required(),
  repeatPassword: Joi.string()
})

function validateLogin(req, res, next) {
  Joi.validate(req.body, schema, (err, value) => { 
    if (err) {
      return next(newError(400, err.details[0].message));
    } else {
      return next();
    }
  }); 
}

module.exports = validateLogin;