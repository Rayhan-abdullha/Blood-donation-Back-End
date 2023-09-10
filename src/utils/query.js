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

module.exports = {
  generateQueryString,
};
