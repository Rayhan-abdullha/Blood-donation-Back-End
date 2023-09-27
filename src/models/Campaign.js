const { Schema, model } = require("mongoose");

const campaignSchema = new Schema(
  {
    admin: {
      type: Schema.ObjectId,
      ref: "Campaign",
    },
    title: {
      type: String,
      minLength: [6, "Title is too Short"],
      required: true,
    },
    body: {
      type: String,
      minLength: [10, "Description is too Short"],
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    open: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "draft"],
      default: "draft",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);
const Campaign = model("Campaign", campaignSchema);
module.exports = Campaign;
