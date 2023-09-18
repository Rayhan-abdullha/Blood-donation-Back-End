const inboxSearvices = require("../../../../lib/inbox");

const replyMessage = (req, res, next) => {
  const { status, reply } = req.body;
  try {
    const inbox = inboxSearvices;
  } catch (err) {
    next(err);
  }
};

module.exports = replyMessage;
