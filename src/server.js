require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB } = require("./db");

// create server
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Database connection
const main = async () => {
  try {
    await connectDB();
    console.log("Database connected.");
    server.listen(PORT, () => {
      console.log(`Server is listing on PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};
main();
