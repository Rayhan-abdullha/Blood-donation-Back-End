const router = require("express").Router();
const { controller: campaignController } = require("../../app/v1/campaign");
const {
  campaignSchema,
  authenticate,
  authorization,
  isAdmin,
} = require("../../middleware");
router
  .route("/api/v1/admin/campaigns")
  .post(
    isAdmin,
    campaignSchema.createCampaignValidaion,
    campaignController.createCampaign
  );
router
  .route("/api/v1/campaigns")
  .post(
    isAdmin,
    campaignSchema.createCampaignValidaion,
    campaignController.createCampaign
  )
  .get(isAdmin, campaignController.findAllCampaign);

router
  .route("/api/v1/admin/campaigns/:id")
  .patch(isAdmin, campaignController.updateCampaign)
  .delete(isAdmin, campaignController.deleteSingleCampaign);
module.exports = router;
