const Inbox = require("../../models/Inbox");
const User = require("../../models/User");
const { errors } = require("../../utils");
const createMessage = async ({ message }) => {
  if (!message) {
    throw errors.BadRequest();
  }
  const inbox = new Inbox({ message });
  await inbox.save();
  const user = await User.findById("64fb054fb9b5e328b9843e91");
  user.inbox.push(inbox.id);
  await user.save();
  return { ...inbox._doc, id: inbox.id };
};

const findMessageByuserId = async (id) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const messages = await User.findById(id).populate({
    path: "inbox",
    select: ["id", "message", "status", "createdAt", "updatedAt"],
  });

  console.log(messages._doc);
  return [...messages._doc.inbox];
};

module.exports = {
  createMessage,
  findMessageByuserId,
};
