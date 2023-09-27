const campaignSearvices = require("../../../../lib/campaign");

const updateCampaign = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateData = await campaignSearvices.updateInfo({
      id,
      admin: req.admin,
      campaignInfo: req.body,
    });

    const response = {
      code: 200,
      message: "Campagin updated successfull",
      data: updateData,
      links: {
        self: `${req.url}`,
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = updateCampaign;
