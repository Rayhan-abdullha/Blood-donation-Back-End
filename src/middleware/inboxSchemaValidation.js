const { errors } = require("../utils");
const { messageSchema } = require("../validation/inbox");
const sendMessageSValidatlion = async (req, res, next) => {
  const { error, value } = messageSchema.validate(
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

module.exports = {
  sendMessageSValidatlion,
};
