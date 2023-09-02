require("dotenv").config();
const mongoose = require("mongoose");

// connection_DB_URL
let connectionURL = process.env.DB_URL;
connectionURL = connectionURL.replace("<username>", process.env.DB_USERNAME);
connectionURL = connectionURL.replace("<password>", process.env.DB_PASS);
connectionURL = `${connectionURL}/${process.env.DB_NAME}?${process.env.DB_QUERY}`;
// Database connection
const connectDB = async () => {
  return mongoose.connect(connectionURL, { dbName: process.env.DB_NAME });
};

module.exports = connectDB;
