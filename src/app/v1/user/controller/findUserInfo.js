const userSearvices = require("../../../../lib/user");

const findSingleUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userSearvices.findUserInfo(id, req.body);

    const response = {
      code: 200,
      data: user,
      link: `${req.url}`,
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleUser;
