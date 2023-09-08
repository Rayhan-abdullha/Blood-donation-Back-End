const router = require("express").Router();
const { controller: authController } = require("../../app/v1/auth");
const { userSchema } = require("../../middleware");
router
  .post(
    "/api/v1/auth/register",
    userSchema.registerSchemaValidate,
    authController.register
  )
  .post(
    "/api/v1/auth/login",
    userSchema.loginSchemaValidation,
    authController.login
  );

module.exports = router;
