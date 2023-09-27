const { errors } = require("../utils");
const { bloodSchema } = require("../validation/blood");

const requestBloodValidation = async (req, res, next) => {
  const { error, value } = bloodSchema.validate(
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
    req.validData = value;
    next();
  }
};

module.exports = { requestBloodValidation };
