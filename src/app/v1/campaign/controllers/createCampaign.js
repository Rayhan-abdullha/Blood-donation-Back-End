const campaignSearvices = require("../../../../lib/campaign");
const createCampaign = async (req, res, next) => {
  const cover = req.body.cover || "";
  const { title, description, startDate, endDate } = req.data;
  try {
    const campaign = await campaignSearvices.createCampaign({
      title,
      description,
      cover,
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
    res.status(400).json(err);
  }
};

module.exports = createCampaign;
