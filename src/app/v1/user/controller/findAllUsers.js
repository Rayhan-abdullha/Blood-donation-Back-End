const userSearvices = require("../../../../lib/user");
const defaults = require("../../../../config");
const { query } = require("../../../../utils");
const usersUtils = require("../utils");

const findAllUsers = async (req, res, next) => {
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sortType || defaults.sortType;
  const sortBy = req.query.sortBy || defaults.sortBy;
  const search = req.query.search || defaults.search;
  try {
    const users = await userSearvices.findUsers({
      admin: req.admin,
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const totalItems = await userSearvices.count({ search });
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
      page,
    });

    // data transformation
    const finalData = usersUtils.getTransFormData({
      data: users,
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
    next(err);
  }
};

module.exports = findAllUsers;
