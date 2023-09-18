const createInbox = require("./createInbox");
const findInbox = require("./findSingleUserMessages");
const replyMessage = require("./replyMessage");
const deleteMessage = require("./deleteSingleMessages");
const findAllMessages = require("./findAllMessage");
module.exports = {
  createInbox,
  findInbox,
  replyMessage,
  deleteMessage,
  findAllMessages,
};
