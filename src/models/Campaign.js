const { Schema, model } = require("mongoose");

const campaignSchema = new Schema(
  {
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
    open: {
      type: String,
      minLength: [3, "Open is too Short"],
      minLength: [5, "Open is too Long"],
    },
    close: {
      type: String,
      minLength: [3, "Open is too Short"],
      minLength: [5, "Open is too Long"],
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
