const {
  authorizetionError,
  notFound,
  BadRequest,
  authenticationError,
} = require("../utils/errors");
const bloodSearvice = require("../lib/blood");
const volunteerSearvices = require("../lib/volunteer");
const userSearvices = require("../lib/user");
const inboxSearvices = require("../lib/inbox");

const ownerShip =
  (model = "") =>
  async (req, _res, next) => {
    if (model === "Blood") {
      try {
        const isOwner = await bloodSearvice.checkOwnerShip({
          resourceId: req.params.id,
          userId: req.params?.userId,
          user: req.user,
        });

        if (isOwner.name) {
          return next(isOwner);
        }
        if (isOwner) {
          return next();
        }
        return next(authorizetionError());
      } catch (err) {
        return next(err);
      }
    }

    if (model === "Volunteer") {
      const ownerShip = await volunteerSearvices.volunteerOwnerShip({
        user: req.user,
        resourceId: req?.params?.id || "",
      });

      try {
        if (ownerShip) {
          return next();
        }
        return next(authorizetionError());
      } catch (err) {
        next(err);
      }
    }

    if (model === "User") {
      const ownerShip = await userSearvices.userOwnership({
        user: req.user,
        resourceId: req.params.id,
      });
      if (ownerShip) {
        return next();
      } else {
        next(authorizetionError());
      }
    }

    if (model === "Inbox") {
      try {
        const ownerShip = inboxSearvices.inboxOwnership({
          user: req.user,
          resourceId: req.params.id,
        });
        if (ownerShip) {
          return next();
        } else {
          return next(authorizetionError());
        }
      } catch (err) {
        return next(err);
      }
    }
  };

module.exports = ownerShip;
