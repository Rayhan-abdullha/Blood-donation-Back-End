const router = require("express").Router();
const { controller: bloodController } = require("../../app/v1/blood");
const { bloodSchema } = require("../../middleware");

router
  .route("/api/v1/bloods")
  .post(bloodSchema.requestBloodValidation, bloodController.createBloodRequest)
  .get(bloodController.findAllBloodRequest);
module.exports = router;
