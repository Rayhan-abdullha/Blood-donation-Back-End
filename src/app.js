const express = require("express");
const { applyMiddleWare } = require("./middleware");
const router = require("./routes");
const { globalErrorHandler, notFoundHandler } = require("./error");
const User = require("./models/User");
const Volunteer = require("./models/Volunteer");
const Blood = require("./models/Blood");
const Campaign = require("./models/Campaign");
const Inbox = require("./models/Inbox");
const { notFound } = require("./utils/errors");
const app = express();
// app level middleware
applyMiddleWare(app);

// Resources routes
app.use(router.authRoutes);
app.use(router.volunteerRoutes);
app.use(router.bloodRoutes);
app.use(router.inboxRoutes);
app.use(router.campaignRoutes);
app.use(router.userRoutes);

app.get("/health", async (_req, res, next) => {
  try {
    res.status(200).json({ status: "OK", message: "API Health is Good" });
  } catch (err) {
    next(err);
  }
});

app.get("/", async (_req, res, next) => {
  // await Volunteer.deleteMany();
  // await Blood.deleteMany();
  // await User.deleteMany();
  // await Campaign.deleteMany();
  // await Inbox.deleteMany();
  try {
    const volunteer = await Volunteer.find()
      .populate({ path: "author", select: "name" })
      .select("id author status");

    res.status(200).json({ status: "OK", volunteer });
  } catch (err) {
    // res.status(200).json(err);
    next(notFound());
  }
});

// Not Found Error Handling
app.use(notFoundHandler);
// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
