const volunteerSearvices = require("../../../../lib/volunteer");
const updateVolunteer = async (req, res, next) => {
  const { id } = req.params;
  const status = req.body.status || "";
  try {
    const updated = await volunteerSearvices.updatedVolunteerStatus({
      id,
      status,
      admin: req.admin,
      authUser: req.authUser,
    });

    const response = {
      code: 200,
      message: "Status Updated Successfull",
      data: updated,
      links: {
        self: `${req.url}`,
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = updateVolunteer;
