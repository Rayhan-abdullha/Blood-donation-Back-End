const { errors } = require("../utils");
const { userSchema, loginSchema } = require("../validation/user");

const registerSchemaValidate = async (req, res, next) => {
  const cover = req.body.cover || " ";
  const { name, email, password } = req.body;
  const { error, value } = userSchema.validate(
    { name, email, password, cover },
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
  const { email, password } = req.body;
  const { error, value } = loginSchema.validate(
    { email, password },
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
