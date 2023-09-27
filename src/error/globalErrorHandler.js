const handleValidationError = require("./handleValidationError");

const globalErrorHandler = (err, _req, res, _next) => {
  // console.log("global error", err.message);
  const errors = {
    code: 500,
    message: "Internal Server Error",
  };

  if (err.status === 500) {
    return res.status(err.status).json(errors);
  } else if (err?.name === "CastError") {
    return res.status(err.status || 400).json({
      code: err.status || 400,
      message: err.name,
      errorMessages: [{ filed: err.path, message: err.message }],
    });
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    return res.status(err?.status || 400).json(simplifiedError);
  } else if (!err.status) {
    res
      .status(err.status || 520)
      .json({ code: err.status || 520, message: err.message });
  } else if (err instanceof Error) {
    return res
      .status(err.status)
      .json({ code: err?.status, message: err?.message });
  } else if (err instanceof ApiError) {
    return res.status(err.status).json(err);
  }
};
module.exports = globalErrorHandler;
