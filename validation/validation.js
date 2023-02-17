const Joi = require('joi');
//validations
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .max(30)
      .required(),
    phone: Joi.number()
      .min(10 ** 9)
      .max(10 ** 10 - 1)
      .messages({
        'number.min': 'Contact number should be 10 digit.',
        'number.max': 'Contact number should be 10 digit'
      })
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(10)
      .required()

  })
  return schema.validate(data);
}

//login validations

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(10)
      .required()
  })
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;