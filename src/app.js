const express = require("express");
const { applyMiddleWare } = require("./middleware");
const router = require("./routes");
const { globalErrorHandler, notFoundHandler } = require("./error");
const User = require("./models/User");
const Volunteer = require("./models/Volunteer");
const app = express();
// app level middleware
applyMiddleWare(app);

// Resources routes
app.use(router.authRoutes);
app.use(router.volunteerRoutes);
app.use(router.bloodRoutes);
app.use(router.inboxRoutes);
app.use(router.campaignRoutes);

app.get("/health", async (_req, res, next) => {
  try {
    res.status(200).json({ status: "OK", message: "API Health is Good" });
  } catch (err) {
    next(err);
  }
});

app.get("/", async (_req, res, next) => {
  const user = await Volunteer.find();
  try {
    res.status(200).json({ status: "OK", data: user });
  } catch (err) {
    next(err);
  }
});

// Not Found Error Handling
app.use(notFoundHandler);
// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
