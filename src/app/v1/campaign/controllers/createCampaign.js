const campaignSearvices = require("../../../../lib/campaign");
const createCampaign = async (req, res, next) => {
  const { title, body, cover, startDate, endDate, open, close } = req.data;
  try {
    const campaign = await campaignSearvices.createCampaign({
      admin: req.admin,
      title,
      body,
      cover,
      open,
      close,
      startDate,
      endDate,
    });
    const response = {
      code: 201,
      message: "Campaing created successfull",
      data: campaign,
    };
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = createCampaign;
