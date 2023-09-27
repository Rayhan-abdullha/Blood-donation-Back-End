const inboxSearvies = require("../../../../lib/inbox");

const createInbox = async (req, res, next) => {
  const { message } = req.body;
  try {
    const sendMessage = await inboxSearvies.createMessage({
      message,
      user: req.user,
    });
    const response = {
      code: 201,
      message: "Message has been sent",
      data: sendMessage,
      link: {
        self: `${req.url}`,
      },
    };
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = createInbox;
