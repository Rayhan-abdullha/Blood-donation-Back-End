const express = require("express");
const applyMiddleWare = require("./middleware");
const router = require("./routes");
const app = express();
// app level middleware
applyMiddleWare(app);

// routes
app.use(router);

module.exports = app;
