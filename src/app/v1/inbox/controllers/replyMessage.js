const inboxSearvices = require("../../../../lib/inbox");

const replyMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    await inboxSearvices.replyMessage({
      admin: req.admin,
      id,
      replyMsg: req.body,
    });
    const response = {
      code: 200,
      message: "Reply has been sent to user",
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = replyMessage;
