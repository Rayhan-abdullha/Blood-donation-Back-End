const express = require("express");
const applyMiddleWare = require("./middleware");
const router = require("./routes");
const { globalErrorHandler, notFoundHandler } = require("./error");
const { logger } = require("./utils");

const app = express();
// app level middleware
applyMiddleWare(app);

// Resources routes
app.use(router.authRoutes);

app.get("/health", (_req, res, next) => {
  try {
    res.status(200).json({ status: "OK", message: "API Health is Good" });
  } catch (err) {
    next(err);
  }
});

// Not Found Error Handling
app.use(notFoundHandler);
// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
