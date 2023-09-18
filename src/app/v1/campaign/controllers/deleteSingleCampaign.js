const campaignSearvices = require("../../../../lib/campaign");
const deleteSingleCampaign = async (req, res, next) => {
  const { id } = req.params;
  try {
    await campaignSearvices.deleteCampaign({ admin: req.admin, id });
    const response = {
      code: 200,
      message: "Deleted successfull",
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteSingleCampaign;
