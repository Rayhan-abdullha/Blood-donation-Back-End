const router = require("express").Router();
const { controller: inboxController } = require("../../app/v1/inbox");
const {
  inboxSchema,
  authenticate,
  authorization,
  ownerShip,
} = require("../../middleware");
router
  .route("/api/v1/inboxes")
  .post(
    authenticate,
    authorization(["admin", "user"]),
    ownerShip("Inbox"),
    inboxSchema.sendMessageSValidatlion,
    inboxController.createInbox
  );

router
  .route("/api/v1/users/:id/inboxes")
  .get(
    authenticate,
    authorization(["admin", "user"]),
    ownerShip("Inbox"),
    inboxController.findInbox
  );

module.exports = router;
