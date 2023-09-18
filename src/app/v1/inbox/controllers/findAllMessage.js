const inboxSearvices = require("../../../../lib/inbox");
const defaults = require("../../../../config");
const { query } = require("../../../../utils");

const findAllMessages = async (req, res, next) => {
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sortType || defaults.sortType;
  const sortBy = req.query.sortBy || defaults.sortBy;

  try {
    const inboxes = await inboxSearvices.findAll({
      admin: req.admin,
      page,
      limit,
      sortType,
      sortBy,
      path: req.path,
    });

    const pagination = query.getPagination({
      totalItems: inboxes.length,
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
      data: inboxes,
      pagination,
      links,
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAllMessages;
