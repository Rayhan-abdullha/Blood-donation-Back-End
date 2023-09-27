const userSearvices = require("../../../../lib/user");
const changePassword = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedInfo = await userSearvices.updatePass(id, req.body);

    const response = {
      code: 200,
      message: "Password changed",
      data: updatedInfo,
      link: `${req.url}`,
    };

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = changePassword;
