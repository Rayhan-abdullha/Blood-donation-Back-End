const Inbox = require("../../models/Inbox");
const User = require("../../models/User");
const { errors } = require("../../utils");
const createMessage = async ({ message = "", user = {} }) => {
  if (!message) {
    throw errors.BadRequest();
  }
  const inbox = new Inbox({
    author: user.id,
    message: {
      msg: message,
    },
  });
  await inbox.save();
  const authUser = await User.findById(user.id);

  authUser?.inbox.push(inbox.id);
  await authUser.save();
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

  return [...messages._doc.inbox];
};

const inboxOwnership = ({ user = {}, resourceId = "" }) => {
  if (user.role.includes("admin")) {
    return true;
  }

  if (resourceId) {
    if (resourceId === user.id) {
      return true;
    }
    return false;
  }
  return true;
};

module.exports = {
  createMessage,
  findMessageByuserId,
  inboxOwnership,
};
