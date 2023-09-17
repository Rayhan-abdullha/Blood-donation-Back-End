const usrSearvices = require("../../../../lib/user");
const deleteSingleUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    await usrSearvices.deleteUser({ id });
    console.log("deleted");
    return res.send("deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = deleteSingleUser;
