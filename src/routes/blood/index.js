const router = require("express").Router();
const { controller: bloodController } = require("../../app/v1/blood");
const { bloodSchema } = require("../../middleware");

router
  .route("/api/v1/bloods")
  .post(bloodSchema.requestBloodValidation, bloodController.createBloodRequest)
  .get(bloodController.findAllBloodRequest);

router.route("/api/v1/bloods/:id").delete(bloodController.deleteBloodRequest);
router
  .route("/api/v1/users/:userId/bloods")
  .get(bloodController.findUserBloods);

module.exports = router;
