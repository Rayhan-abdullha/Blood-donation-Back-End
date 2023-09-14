const { authorizetionError, notFound, BadRequest } = require("../utils/errors");
const bloodSearvice = require("../lib/blood");
const volunteerSearvices = require("../lib/volunteer");

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
          console.log("yes");
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
  };

module.exports = ownerShip;
