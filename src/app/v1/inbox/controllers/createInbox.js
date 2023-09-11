const inboxSearvies = require("../../../../lib/inbox");

const createInbox = async (req, res, next) => {
  const { message } = req.body;
  try {
    const sendMessage = await inboxSearvies.createMessage({ message });
    const response = {
      code: 201,
      message: "Message has been sent",
      data: {
        id: sendMessage.id,
        message: sendMessage.message,
        status: sendMessage.status,
        createAt: sendMessage.createdAt,
        updatedAt: sendMessage.updatedAt,
      },
      link: {
        self: "/inboxes",
      },
    };
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = createInbox;
