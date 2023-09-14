const defaults = require("../../../../config");
const bloodSearvices = require("../../../../lib/blood");
const { query } = require("../../../../utils");
const bloodUtils = require("../utils");
const findAllBloodRequest = async (req, res, next) => {
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sortType || defaults.sortType;
  const sortBy = req.query.sortBy || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    let bloods = await bloodSearvices.findAll({
      page,
      limit,
      sortBy,
      sortType,
      search,
    });

    const totalItems = await bloodSearvices.count({ search });
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

    // data transformation
    const finalData = bloodUtils.getTrasformData({
      item: bloods.data,
      path: req.path,
    });

    const response = {
      code: 200,
      data: finalData,
      pagination,
      links,
    };
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = findAllBloodRequest;
