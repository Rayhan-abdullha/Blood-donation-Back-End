const router = require("express").Router();
const { controller: usersController } = require("../../app/v1/user");
const { isAdmin } = require("../../middleware");
router.route("/api/v1/admin/users").get(isAdmin, usersController.findAllUsers);

module.exports = router;
