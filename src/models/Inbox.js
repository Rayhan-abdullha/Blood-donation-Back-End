const { Schema, model } = require("mongoose");

const inboxSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    message: {
      type: {
        msg: {
          type: String,
          minLength: [2, "Message is to Short"],
          required: true,
        },
        reply: {
          type: [String],
          minLength: [2, "reply is to Short"],
        },
      },
      required: true,
    },
    status: {
      type: String,
      enum: ["unseen", "seen"],
      default: "unseen",
    },
  },
  {
    timestamps: true,
    id: true,
  }
);
const Inbox = model("Inbox", inboxSchema);
module.exports = Inbox;
