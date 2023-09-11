const bloodSearvices = require("../../../../lib/blood");
const deleteVBloodRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    await bloodSearvices.deleteBlood(id);
    return res
      .status(200)
      .json({ code: 200, message: "Blood Request deleted Successfull" });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteVBloodRequest;
