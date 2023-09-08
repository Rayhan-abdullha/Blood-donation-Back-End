const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(20),
  email: Joi.string()
    .required()
    .trim()
    .email({ tlds: { allow: false } })
    .message("Invalid Email Format"),
  password: Joi.string().required().min(6).message("Password is too Short"),
  cover: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().trim(),
  password: Joi.string().required().min(6).message("Password is too Short"),
});

module.exports = { userSchema, loginSchema };
