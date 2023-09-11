const campaignSearvices = require("../../../../lib/campaign");
const findAllCampaign = async (req, res, next) => {
  try {
    const campaigns = await campaignSearvices.findAll();

    const data = campaigns.map((item) => {
      return {
        title: item.title,
        description: item.description,
        cover: item.cover,
        status: item.status,
        startDate: item.startDate,
        endDate: item.endDate,
        link: `/campaign/${item.id}`,
      };
    });

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
