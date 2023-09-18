const campaignSearvices = require("../../../../lib/campaign");
const defaults = require("../../../../config");
const bloodSearvices = require("../../../../lib/blood");
const { query } = require("../../../../utils");
const bloodUtils = require("../utils");

const findAllCampaign = async (req, res, next) => {
  console.log(req.admin);
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sortType || defaults.sortType;
  const sortBy = req.query.sortBy || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    const campaigns = await campaignSearvices.findAll({
      admin: req.admin,
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const totalItems = await campaignSearvices.count({
      search,
      admin: req.admin,
    });
    const pagination = query.getPagination({
      totalItems,
      limit,
      page,
    });

    // HATOAS Link
    const links = query.getHateOasForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
    });

    const response = {
      code: 200,
      data: campaigns,
      pagination,
      links,
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAllCampaign;
