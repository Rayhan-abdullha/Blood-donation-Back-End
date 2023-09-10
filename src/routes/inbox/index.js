const router = require("express").Router();
const { controller: inboxController } = require("../../app/v1/inbox");
// const { inboxSchema } = require("../../middleware");
router.route("/api/v1/inboxes").post(
  // volunterSchema.createVolunteerValidation,
  inboxController.createInbox
);

module.exports = router;
