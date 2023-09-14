const router = require("express").Router();
const { controller: bloodController } = require("../../app/v1/blood");
const {
  bloodSchema,
  authenticate,
  authorization,
  ownerShip,
} = require("../../middleware");

router
  .route("/api/v1/bloods")
  .post(
    authenticate,
    authorization(["user", "admin"]),
    bloodSchema.requestBloodValidation,
    bloodController.createBloodRequest
  )
  .get(bloodController.findAllBloodRequest);

router
  .route("/api/v1/bloods/:id")
  .delete(
    authenticate,
    authorization(["user", "admin"]),
    ownerShip("Blood"),
    bloodController.deleteBloodRequest
  );
router
  .route("/api/v1/users/:userId/bloods")
  .get(
    authenticate,
    authorization(["user", "admin"]),
    ownerShip("Blood"),
    bloodController.findUserBloods
  );

module.exports = router;
