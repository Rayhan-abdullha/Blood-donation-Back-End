const bloodSearvices = require("../../../../lib/blood");
const query = require("../../../../utils");
const findAllBloodRequest = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sortType || "dsc";
  const sortBy = req.query.sortBy || "updatedAt";
  const search = req.query.search || "";

  try {
    let bloods = await bloodSearvices.findAll({
      page,
      limit,
      sortBy,
      sortType,
      search,
    });
    console.log("length: ", bloods.length);
    bloods = bloods.map((item) => {
      return {
        ...item._doc,
        link: `/bloods/${item.id}`,
      };
    });
    const totalItems = await bloodSearvices.count();
    const totalPages = Math.ceil(totalItems / limit);
    console.log(totalItems);
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
      self: "/bloods",
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
      data: bloods,
      pagination,
      links,
    };
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = findAllBloodRequest;
