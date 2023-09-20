const volunteerSearvice = require("../../../../lib/volunteer");
const { query } = require("../../../../utils");

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
    const totalPages = Math.ceil(totalItems / limit);

    const pagination = {
      page,
      limit,
      totalPages,
      totalItems,
    };
    if (page < totalPages) {
      pagination.nextPage = page + 1;
    }

    if (page > totalPages || page !== 1) {
      pagination.prevPage = page - 1;
    }

    const links = {
      self: `${req.url}`,
    };
    if (pagination.prevPage) {
      const qs = query.generateQueryString({
        queryParams: req.query,
        page: page - 1,
      });
      links.prevPage = `${req.path}?${qs}`;
    }
    if (pagination.nextPage) {
      const qs = query.generateQueryString({
        queryParams: req.query,
        page: page + 1,
      });
      links.nextPage = `${req.path}?${qs}`;
    }
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
