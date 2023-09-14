const router = require("express").Router();
const { controller: campaignController } = require("../../app/v1/campaign");
const {
  campaignSchema,
  authenticate,
  authorization,
} = require("../../middleware");
router
  .route("/api/v1/campaigns")
  .post(
    authenticate,
    authorization(["admin", "user"]),
    campaignSchema.createCampaignValidaion,
    campaignController.createCampaign
  )
  .get(campaignController.findAllCampaign);

module.exports = router;
