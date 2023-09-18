const bloodSearvices = require("../../../../lib/blood");
const findSingleBlood = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blood = await bloodSearvices.findBloodRequestInfo({
      id,
      admin: req.admin,
    });

    const response = {
      code: 200,
      data: blood,
      links: {
        self: `${req.url}`,
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleBlood;
