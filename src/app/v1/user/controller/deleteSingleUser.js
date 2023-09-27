const usrSearvices = require("../../../../lib/user");
const deleteSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await usrSearvices.deleteUser({ id, admin: req.admin });
    const response = {
      code: 204,
      message: "Delete The User successfull",
    };
    return res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteSingleUser;
