const Joi = require('@hapi/joi');

const registerUserValidator = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(data, { abortEarly: false });
};

const loginUserValidator = data => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  registerUserValidator,
  loginUserValidator,
};
