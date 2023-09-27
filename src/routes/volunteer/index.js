const router = require("express").Router();
const { controller: volunteerController } = require("../../app/v1/volunteer");
const {
  volunterSchema,
  authenticate,
  authorization,
  ownerShip,
  isAdmin,
} = require("../../middleware");

router
  .route("/api/v1/volunteers")
  .post(
    authenticate,
    authorization("user", "admin"),
    ownerShip("Volunteer"),
    volunterSchema.createVolunteerValidation,
    volunteerController.createVolunteer
  )
  .get(isAdmin, volunteerController.findAllVolunters);

router
  .route("/api/v1/volunteers/:id")
  .get(isAdmin, volunteerController.findSingleVolunteer)
  .delete(
    authenticate,
    authorization(["user", "admin"]),
    ownerShip("Volunteer"),
    volunteerController.deleteVolunterRequest
  );

router
  .route("/api/v1/volunteers/:id/status")
  .patch(isAdmin, volunteerController.updateVolunteer);

module.exports = router;
