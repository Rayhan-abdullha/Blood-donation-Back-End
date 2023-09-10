const router = require("express").Router();
const { controller: volunteerController } = require("../../app/v1/volunteer");
const { volunterSchema } = require("../../middleware");
router
  .route("/api/v1/volunteers")
  .post(
    volunterSchema.createVolunteerValidation,
    volunteerController.createVolunteer
  );

module.exports = router;
