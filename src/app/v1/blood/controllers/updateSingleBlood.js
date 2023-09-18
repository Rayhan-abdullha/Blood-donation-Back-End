const bloodSearvices = require("../../../../lib/blood");
const updateBloodStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await bloodSearvices.updateStatus({
      id,
      status,
      admin: req.admin,
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

module.exports = updateBloodStatus;
