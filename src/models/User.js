const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
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
  },
  {
    id: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
