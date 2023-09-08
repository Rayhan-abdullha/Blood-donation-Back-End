const notFound = (msg = "Resource Not Found!", code = 404) => {
  const error = new Error(msg);
  error.status = code;
  return error;
};

const BadRequest = (msg = "Bad Requsts", code = 400) => {
  const error = new Error(msg);
  error.status = code;
  return error;
};

const serverError = (msg = "Internal Server Error") => {
  const error = new Error(msg);
  error.status = 500;
  return error;
};

const authenticationError = (msg = "Authentication Failed") => {
  const error = new Error(msg);
  error.status = 401;
  return error;
};

const authorizetionError = (msg = "Permission Denied") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};

const schemaErrorSimplified = (error) => {
  return error?.details?.map((err) => {
    return {
      field: err?.path[0],
      message: err?.message,
    };
  });
};

module.exports = {
  notFound,
  BadRequest,
  serverError,
  schemaErrorSimplified,
  authenticationError,
  authorizetionError,
};
