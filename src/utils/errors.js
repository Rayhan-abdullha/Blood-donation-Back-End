const notFound = (msg = "Resource Not Found!") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};

module.exports = {
  notFound,
};
