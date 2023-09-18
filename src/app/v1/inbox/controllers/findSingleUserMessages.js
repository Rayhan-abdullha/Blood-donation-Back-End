const inboxSearvices = require("../../../../lib/inbox");

const findSingleUserMessages = async (req, res, next) => {
  const { id } = req.params;
  try {
    const messasges = await inboxSearvices.findMessageByuserId(id);

    const data = messasges.map((item) => {
      return {
        id: item.id,
        message: item.message,
        status: item.status,
        createAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
    const response = {
      code: 201,
      data,
      link: {
        self: "/inboxes",
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = findSingleUserMessages;
