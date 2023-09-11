const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid Email Format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password is too Short"],
    },
    role: {
      type: [String],
      enum: ["user", "volunteer", "admin"],
      default: ["user"],
    },
    cover: {
      type: String,
    },
    volunteer: {
      type: Schema.ObjectId,
      ref: "Volunteer",
    },
    inbox: [{ type: Schema.ObjectId, ref: "Inbox" }],
  },
  {
    id: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
