const userSearvices = require("../../../../lib/user");
const updatedUserProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedInfo = await userSearvices.updatedInfo(id, req.body);

    const response = {
      code: 200,
      message: "Upadated Successfull",
      data: updatedInfo,
      link: `${req.url}`,
    };

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = updatedUserProfile;
