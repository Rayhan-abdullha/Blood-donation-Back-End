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
  const messageReduce = {
    id: inbox.id,
    message: inbox._doc?.message?.msg,
    status: inbox._doc.status,
    createdAt: inbox._doc?.createdAt,
    updatedAt: inbox._doc?.updatedAt,
  };
  return messageReduce;
};

const findAll = async ({
  admin = false,
  page = _default.page,
  limit = _default.limit,
  sortType = _default.sortType,
  sortBy = _default.sortBy,
  path = "",
}) => {
  if (!admin) {
    throw errors.authorizetionError();
  }
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  let messages = await Inbox.find()
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  messages = messages.map((item) => {
    return {
      ...item._doc,
      links: `${path}/${item.id}`,
    };
  });
  return messages;
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

const replyMessage = async ({ admin = false, id, replyMsg = "" }) => {
  console.log(id);
  if (!admin) {
    throw errors.authorizetionError();
  }
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const message = await Inbox.findById(id);
  if (!message) {
    throw errors.notFound("Message is not Found");
  }

  const { status, reply } = replyMsg;
  message.status = status ?? message.status;
  reply && message?.message?.reply.push(reply);
  await message.save();
  return {
    ...message._doc,
    id: message.id,
  };
};

const deleteMessage = async ({ id }) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const message = await Inbox.findById(id);
  if (!message) {
    throw errors.notFound("Message not Found");
  }

  const authUser = await User.findById(message.author.toString());

  const inboxId = authUser?.inbox.filter((item) => item.toString() !== id);
  authUser.inbox = inboxId;
  await Inbox.findByIdAndDelete(id);
  return await authUser.save();
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
  replyMessage,
  findAll,
  deleteMessage,
};
