const router = require("express").Router();
const { controller: volunteerController } = require("../../app/v1/volunteer");
const { volunterSchema } = require("../../middleware");
router
  .route("/api/v1/volunteers")
  .post(
    volunterSchema.createVolunteerValidation,
    volunteerController.createVolunteer
  )
  .get(volunteerController.findAllVolunters);

router
  .route("/api/v1/volunteers/:id")
  .get(volunteerController.findSingleVolunteer)
  .delete(volunteerController.deleteVolunterRequest);

module.exports = router;
