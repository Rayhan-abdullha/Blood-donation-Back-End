const { Schema, model } = require("mongoose");

const bloodSchema = new Schema(
  {
    author: {
      type: String,
    },
    title: {
      type: String,
      minLength: [6, "Title is to Short"],
      maxLength: [70, "Title is to Long"],
      required: true,
    },
    body: {
      type: String,
    },
    place: {
      type: String,
      minLength: [6, "Place is to Short"],
      required: true,
    },
    phone: {
      type: String,
      minLength: [10, "Title is to Short"],
      maxLength: [15, "Title is to Long"],
      required: true,
    },
    nationalID: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "decline", "done", "in-progress"],
      default: "pending",
    },
    patientInfo: {
      name: {
        type: String,
        minLength: [3, "Title is to Short"],
        maxLength: [30, "Title is to Long"],
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      phone: {
        type: String,
        minLength: [10, "Title is to Short"],
        maxLength: [15, "Title is to Long"],
        required: true,
      },
      nationalID: {
        type: String,
      },
      occupation: {
        type: String,
        enum: [
          "student",
          "jobholder",
          "worker",
          "housemaker",
          "actores",
          "others",
        ],
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "others"],
        required: true,
      },
      fatherName: {
        type: String,
        minLength: [3, "Title is to Short"],
        maxLength: [30, "Title is to Long"],
        required: true,
      },
      motherName: {
        type: String,
        minLength: [3, "Title is to Short"],
        maxLength: [30, "Title is to Long"],
        required: true,
      },
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        required: true,
      },
      cover: {
        type: String,
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
        houseName: {
          type: String,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const Blood = model("Blood", bloodSchema);
module.exports = Blood;
