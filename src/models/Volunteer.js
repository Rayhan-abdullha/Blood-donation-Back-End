const { Schema, model } = require("mongoose");

const volunteerSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    age: {
      type: Number,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    study: {
      type: String,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    nationalIdNo: {
      type: String,
    },
    bio: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "volunteer", "block"],
      default: "pending",
    },
    address: {
      country: {
        type: String,
        default: "Bangladesh",
      },
      division: {
        type: String,
        required: true,
      },
      dist: {
        type: String,
        required: true,
      },
      upazila: {
        type: String,
        required: true,
      },
      currentAddress: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
    },
    donateCount: {
      type: Number,
      default: 0,
    },
    age: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const Volunteer = model("Volunteer", volunteerSchema);
module.exports = Volunteer;
