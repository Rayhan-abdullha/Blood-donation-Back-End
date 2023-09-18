const Campaign = require("../../models/Campaign");
const { errors } = require("../../utils");
const campaignData = require("../../app/v1/campaign/utils");
const _default = require("../../config");

const createCampaign = async ({
  admin = false,
  title,
  body,
  open,
  close,
  cover,
  startDate,
  endDate,
}) => {
  if (!admin) {
    throw errors.authorizetionError();
  }
  const campaignInfo = new Campaign({
    admin: admin.id,
    title,
    body,
    cover,
    open,
    close,
    startDate,
    endDate,
  });
  const campaign = await campaignInfo.save();
  return { ...campaign._doc, id: campaign.id };
};

const findAll = async ({
  admin = false,
  page = _default.page,
  limit = _default.limit,
  sortType = _default.sortType,
  sortBy = _default.sortBy,
  search = _default.search,
}) => {
  const filter = {
    title: {
      $regex: search,
      $options: "i",
    },
  };
  if (!admin) {
    filter.status = { $nin: ["draft"] };
  }
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const campaigns = await Campaign.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
  const data = campaignData.campaignDataTransformation({ campaigns });
  return data;
};

const updateInfo = async ({ admin = false, id, campaignInfo }) => {
  if (!admin) {
    throw errors.authorizetionError();
  }

  if (!id) {
    errors.BadRequest("Id is Required");
  }
  const campaign = await Campaign.findById(id);

  if (!campaign) {
    throw errors.notFound("Campaign is not Found");
  }
  const { title, body, cover, open, status, close, startDate, endDate } =
    campaignInfo;

  campaign.title = title ?? campaign.title;
  campaign.body = body ?? campaign.body;
  campaign.cover = cover ?? campaign.cover;
  campaign.open = open ?? campaign.open;
  campaign.close = close ?? campaign.close;
  campaign.status = status ?? campaign.status;
  campaign.startDate = startDate ?? campaign.startDate;
  campaign.endDate = endDate ?? campaign.endDate;

  await campaign.save();
  return { ...campaign._doc, id: campaign.id };
};

const deleteCampaign = async ({ admin = false, id }) => {
  if (!admin) {
    throw errors.authorizetionError();
  }

  if (!id) {
    throw errors.BadRequest("Id is Required");
  }

  const campaign = await Campaign.findById(id);
  if (!campaign) {
    throw errors.notFound("Campaign not Found");
  }
  return await Campaign.findByIdAndDelete(id);
};

const count = async ({ search = _default.search, admin = false }) => {
  let filter = {
    title: {
      $regex: search,
      $options: "i",
    },
  };
  if (!admin) {
    filter.status = { $nin: ["draft"] };
  }

  let users = await Campaign.find(filter);
  return users.length;
};
module.exports = {
  createCampaign,
  count,
  findAll,
  updateInfo,
  deleteCampaign,
};
