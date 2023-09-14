const bloodSearvices = require("../../../../lib/blood");

const findUserBloods = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const bloods = await bloodSearvices.findBloodsByUserId({
      id: userId,
      path: req.url,
    });

    const response = { code: 200, data: bloods, links: `${req.url}` };

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = findUserBloods;
