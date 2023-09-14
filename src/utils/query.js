const defaults = require("../config");
const generateQueryString = ({ queryParams }) => {
  const queryString = Object.keys(queryParams)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        queryParams[key]
      )}`;
    })
    .join("&");
  return queryString;
};

const getPagination = ({
  totalItems = defaults.totalItems,
  limit = defaults.limit,
  page,
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const pagination = {
    page,
    limit,
    totalPages,
    totalItems,
  };
  if (page < totalPages) {
    pagination.next = page + 1;
  }

  if (page > totalPages || page !== 1) {
    pagination.prev = page - 1;
  }
  return pagination;
};

const getHateOasForAllItems = ({
  url = "/",
  path = "",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  const links = {
    self: url,
  };
  if (hasPrev) {
    const qs = generateQueryString({
      queryParams: query,
      page: page - 1,
    });
    links.prevPage = `${path}?${qs}`;
  }
  if (hasNext) {
    const qs = generateQueryString({
      queryParams: query,
      page: page + 1,
    });
    links.nextPage = `${path}?${qs}`;
  }
  return links;
};

module.exports = {
  generateQueryString,
  getPagination,
  getHateOasForAllItems,
};
