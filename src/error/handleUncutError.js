const handleUncutError = () => {
  process.on("unhandledRejection", (error) => {
    console.log(`Error: ${error.message}`);
    console.log(
      "Shutting down the server due to the Unhandled Promise Rejection"
    );

    server.close(() => {
      process.exit(1);
    });
  });
  process.on("uncaughtException", (error) => {
    console.log(`Error: ${error.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
  });
};

module.exports = handleUncutError;
