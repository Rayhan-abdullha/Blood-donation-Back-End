const {
  errors: { notFound },
} = require("./../utils");
const notFoundHandler = (_req, _res, next) => {
  const error = notFound();
  next(error);
};

module.exports = notFoundHandler;
