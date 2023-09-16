const router = require("express").Router();
const { controller: usersController } = require("../../app/v1/user");
const {
  isAdmin,
  authenticate,
  authorization,
  ownerShip,
} = require("../../middleware");
router.route("/api/v1/admin/users").get(isAdmin, usersController.findAllUsers);

router
  .route("/api/v1/users/:id/profile")
  .get(
    authenticate,
    authorization(["user", "admin"]),
    ownerShip("User"),
    usersController.findUserInfo
  );

module.exports = router;
