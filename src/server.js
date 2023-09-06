require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB } = require("./db");
const {
  logger: { infoLogger, errorLogger },
} = require("./utils");

process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});

// create server
let server = http.createServer(app);

const PORT = process.env.PORT || 8000;

// Database connection
const main = async () => {
  try {
    await connectDB();
    errorLogger.error("Database is Connected");
    server = server.listen(PORT, () => {
      infoLogger.info(`Server is listing on PORT ${PORT}`);
    });
  } catch (e) {
    errorLogger.error(e.message);
  }
};
process.on("unhandledRejection", (error) => {
  if (server) {
    server.close(() => {
      errorLogger.error(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

main();

process.on("SIGTERM", () => {
  infoLogger.info("SIGTERM is received");
  if (server) {
    server.close();
  }
});
