const volunteerSearvice = require("../../../../lib/volunteer");
const deleteVolunterRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    await volunteerSearvice.deleteVolunteer({ id, user: req.user });
    return res
      .status(200)
      .json({ code: 200, message: "Volunteer deleted Successfull" });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteVolunterRequest;
