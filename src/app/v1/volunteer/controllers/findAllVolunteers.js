const volunteerSearvice = require("../../../../lib/volunteer");
const { query } = require("../../../../utils");
const {
  getPagination,
  getHateOasForAllItems,
} = require("../../../../utils/query");

const findAllVoulneers = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sortType || "dsc";
  const sortBy = req.query.sortBy || "donateCount";
  const search = req.query.search || "";
  try {
    let volunteers = await volunteerSearvice.findAll({
      page,
      limit,
      sortBy,
      sortType,
      search,
      admin: req.admin,
    });

    const totalItems = await volunteerSearvice.count({
      search,
      admin: req.admin,
    });

    const pagination = getPagination({ totalItems, limit, page });

    const links = getHateOasForAllItems({
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });
    const response = {
      code: 200,
      data: volunteers,
      pagination,
      links,
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAllVoulneers;
