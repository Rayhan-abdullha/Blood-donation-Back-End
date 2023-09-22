const defaults = require("../config");
const generateQueryString = ({ queryParams }) => {
  if (queryParams === undefined) {
    throw new Error("Cannot convert undefined or null to object");
  }
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

  if (page > totalPages && page !== 1) {
    pagination.prev = page - 1;
  }
  return pagination;
};

const getHateOasForAllItems = ({
  path = "/",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  const links = {
    self: path,
  };
  if (hasPrev) {
    const qs = generateQueryString({
      queryParams: query,
      page: page - 1,
    });
    links.prevPage = `${path}?${qs}&page=${page - 1}`;
  }
  if (hasNext) {
    const qs = generateQueryString({
      queryParams: query,
      page: page + 1,
    });
    links.nextPage = `${path}?${qs}&page=${page + 1}`;
  }
  return links;
};

module.exports = {
  generateQueryString,
  getPagination,
  getHateOasForAllItems,
};
