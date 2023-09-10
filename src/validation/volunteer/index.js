const Joi = require("joi");

const volunteerSchema = Joi.object({
  bloodGroup: Joi.string().required(),
  bio: Joi.string().optional(),
  occupation: Joi.string()
    .valid("student", "jobholder", "worker", "housemaker")
    .required(),
  age: Joi.number().required(),
  phone: Joi.number().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  study: Joi.string().optional(),
  cover: Joi.string().optional(),
  address: Joi.object({
    division: Joi.string().required(),
    dist: Joi.string().required(),
    upazila: Joi.string().required(),
    streetAddress: Joi.string().required(),
    currentAddress: Joi.string().required(),
  }),
  nationalIdNo: Joi.string().optional(),
});

module.exports = { volunteerSchema };
