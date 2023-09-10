const { Schema, model } = require("mongoose");

const campaignSchema = new Schema(
  {
    title: {
      type: String,
      minLength: [6, "Message is to Short"],
      required: true,
    },
    description: {
      type: String,
      minLength: [15, "body is to Short"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "done", "pending"],
      default: "pending",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
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
