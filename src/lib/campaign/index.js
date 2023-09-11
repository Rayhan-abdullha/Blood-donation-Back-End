const Campaign = require("../../models/Campaign");

const createCampaign = async ({
  title,
  description,
  cover = "",
  startDate = "",
  endDate = "",
}) => {
  const campaignInfo = new Campaign({
    title,
    description,
    cover,
    startDate,
    endDate,
  });

  const campaign = await campaignInfo.save();

  return { ...campaign._doc, id: campaign.id };
};

const findAll = async () => {
  const campaigns = await Campaign.find({ status: { $eq: "in-progress" } });
  return campaigns;
};
module.exports = {
  createCampaign,
  findAll,
};
