const Joi = require("joi");

const createCampaignSchema = Joi.object({
  title: Joi.string().min(6).required(),
  body: Joi.string().min(10).required(),
  cover: Joi.string().min(0),
  open: Joi.string().required(),
  close: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

module.exports = { createCampaignSchema };
