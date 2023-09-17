const campaignSearvices = require("../../../../lib/campaign");
const campaignData = require("../utils");
const findAllCampaign = async (req, res, next) => {
  try {
    const campaigns = await campaignSearvices.findAll();

    const data = campaignData.campaignDataTransformation({ item: campaigns });

    const response = {
      code: 200,
      data,
      link: {
        self: `/campaign`,
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAllCampaign;
