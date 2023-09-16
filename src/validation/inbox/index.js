const Joi = require("joi");

const messageSchema = Joi.object({
  message: Joi.string().min(2).required(),
});

module.exports = { messageSchema };
