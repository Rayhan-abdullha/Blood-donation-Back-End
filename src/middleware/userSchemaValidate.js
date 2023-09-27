const { errors } = require("../utils");
const { userSchema, loginSchema } = require("../validation/user");

const registerSchemaValidate = async (req, res, next) => {
  const { error, value } = userSchema.validate(
    { ...req.body },
    { abortEarly: false }
  );
  if (error) {
    const errorSimplyfide = errors.schemaErrorSimplified(error);
    return res.status(400).json({
      code: 400,
      message: "Bad Request",
      errorMessages: errorSimplyfide,
    });
  } else {
    req.data = value;
    next();
  }
};

const loginSchemaValidation = (req, res, next) => {
  const { error, value } = loginSchema.validate(
    { ...req.body },
    { abortEarly: false }
  );
  if (error) {
    const errorSimplyfide = errors.schemaErrorSimplified(error);
    return res.status(400).json({
      code: 400,
      message: "Bad Request",
      errorMessages: errorSimplyfide,
    });
  } else {
    req.body = value;
    next();
  }
};

module.exports = {
  registerSchemaValidate,
  loginSchemaValidation,
};
