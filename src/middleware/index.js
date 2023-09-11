const applyMiddleWare = require("./applyMiddlware");
const userSchema = require("./userSchemaValidate");
const volunterSchema = require("./volunteerSchemaValidation");
const bloodSchema = require("./bloodShemaValidation");
const inboxSchema = require("./inboxSchemaValidation");
const campaignSchema = require("./campaignSchemaValidation");
module.exports = {
  applyMiddleWare,
  userSchema,
  volunterSchema,
  bloodSchema,
  inboxSchema,
  campaignSchema,
};
