const applyMiddleWare = require("./applyMiddlware");
const userSchema = require("./userSchemaValidate");
const volunterSchema = require("./volunteerSchemaValidation");
const bloodSchema = require("./bloodShemaValidation");
const inboxSchema = require("./inboxSchemaValidation");
module.exports = {
  applyMiddleWare,
  userSchema,
  volunterSchema,
  bloodSchema,
  inboxSchema,
};
