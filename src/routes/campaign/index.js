const router = require("express").Router();
const { controller: campaignController } = require("../../app/v1/campaign");
const { campaignSchema } = require("../../middleware");
router
  .route("/api/v1/campaigns")
  .post(
    campaignSchema.createCampaignValidaion,
    campaignController.createCampaign
  )
  .get(campaignController.findAllCampaign);

module.exports = router;
