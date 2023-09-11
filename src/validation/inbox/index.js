const Joi = require("joi");

const messageSchema = Joi.object({
  message: Joi.string().min(6).required(),
});

module.exports = { messageSchema };
