const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((error) => {
    return {
      field: error?.path,
      message: error?.message,
    };
  });

  return {
    code: 400,
    message: "ValidationError",
    data: errors,
  };
};

module.exports = handleValidationError;
