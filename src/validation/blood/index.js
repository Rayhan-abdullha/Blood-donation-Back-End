const Joi = require("joi");

const bloodSchema = Joi.object({
  title: Joi.string().min(6).max(70).required(),
  body: Joi.string(),
  place: Joi.string().min(6).required(),
  phone: Joi.string().min(10).max(15).required(),
  nationalID: Joi.string(),
  patientInfo: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().required(),
    phone: Joi.string().min(10).max(15).required(),
    nationalID: Joi.string(),
    occupation: Joi.string()
      .valid(
        "student",
        "jobholder",
        "worker",
        "housemaker",
        "actores",
        "others"
      )
      .required(),
    gender: Joi.string().valid("male", "female", "others").required(),
    fatherName: Joi.string().min(3).max(30).required(),
    motherName: Joi.string().min(3).max(30).required(),
    bloodGroup: Joi.string()
      .valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-")
      .required(),
    cover: Joi.string(),
    address: Joi.object({
      country: Joi.string().default("Bangladesh"),
      division: Joi.string().required(),
      dist: Joi.string().required(),
      upazila: Joi.string().required(),
      houseName: Joi.string().required(),
    }).required(),
  }).required(),
});

module.exports = { bloodSchema };
