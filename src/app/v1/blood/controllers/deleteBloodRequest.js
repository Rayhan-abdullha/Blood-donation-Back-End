const bloodSearvices = require("../../../../lib/blood");
const deleteVBloodRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    await bloodSearvices.deleteBlood({ id, user: req?.user });
    return res
      .status(200)
      .json({ code: 200, message: "Blood Request deleted Successfull" });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteVBloodRequest;
