const router = require("express").Router();
const { controller: campaignController } = require("../../app/v1/campaign");
// const { campaignSchema } = require("../../middleware");
router.route("/api/v1/campaigns").post(
  // volunterSchema.createVolunteerValidation,
  campaignController.createCampaign
);

module.exports = router;
