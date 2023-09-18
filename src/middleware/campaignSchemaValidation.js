const { errors } = require("../utils");
const { createCampaignSchema } = require("../validation/campaign");
const createCampaignValidaion = async (req, res, next) => {
  console.log(req.body);
  const { error, value } = createCampaignSchema.validate(
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
  createCampaignValidaion,
};
