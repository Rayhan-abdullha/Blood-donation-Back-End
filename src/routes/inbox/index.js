const router = require("express").Router();
const { controller: inboxController } = require("../../app/v1/inbox");
const {
  inboxSchema,
  authenticate,
  authorization,
  ownerShip,
  isAdmin,
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
  .route("/api/v1/admin/inboxes")
  .get(isAdmin, inboxController.findAllMessages);

router
  .route("/api/v1/users/:id/inboxes")
  .get(
    authenticate,
    authorization(["admin", "user"]),
    ownerShip("Inbox"),
    inboxController.findInbox
  );

router
  .route("/api/v1/inboxes/:id")
  .delete(
    authenticate,
    authorization(["admin", "user"]),
    ownerShip("Inbox"),
    inboxController.deleteMessage
  );

router
  .route("/api/v1/admin/inboxes/:id/reply")
  .patch(isAdmin, inboxController.replyMessage);
module.exports = router;
