const Joi = require('@hapi/joi');

const createTodValidator = data => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(1000).required(),
  });

  return schema.validate(data, { abortEarly: false });
};

const updateTodoValidator = data => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50),
    description: Joi.string().min(2).max(1000),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  createTodValidator,
  updateTodoValidator,
};
