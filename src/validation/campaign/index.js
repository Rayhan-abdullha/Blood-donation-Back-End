const Joi = require("joi");

const createCampaignSchema = Joi.object({
  title: Joi.string().min(6).required(),
  description: Joi.string().min(10).required(),
  cover: Joi.string(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

module.exports = { createCampaignSchema };
