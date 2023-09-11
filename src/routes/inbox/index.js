const router = require("express").Router();
const { controller: inboxController } = require("../../app/v1/inbox");
const { inboxSchema } = require("../../middleware");
router
  .route("/api/v1/inboxes")
  .post(inboxSchema.sendMessageSValidatlion, inboxController.createInbox);

router.route("/api/v1/users/:id/inboxes").get(inboxController.findInbox);

module.exports = router;
