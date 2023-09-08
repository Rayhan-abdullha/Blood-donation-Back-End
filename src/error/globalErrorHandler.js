const { handleValidationError } = require("./handleValidationError");

const globalErrorHandler = (err, _req, res, _next) => {
  let code = 500;
  let message = "Internal Server Error";
  let errorMessages = [];

  // if (err?.name === "ValidationError") {
  //   const simplifiedError = handleValidationError(err);
  //   code = simplifiedError.code;
  //   message = simplifiedError.message;
  //   errorMessages = simplifiedError.errorMessages;
  // } else if (err instanceof Error) {
  //   message = err?.message;
  //   // errorMessages = err?.message ? [{ field: "", message: err?.message }] : [];
  // } else if (err instanceof ApiError) {
  //   code = err?.status;
  //   message = err?.message;
  //   errorMessages = err?.message ? [{ field: "", message: err.message }] : [];
  // }

  res.status(err.status).json({
    code: err.status,
    message: err.message,
    errorMessages,
  });
};
module.exports = globalErrorHandler;
