const inboxSearvices = require("../../../../lib/inbox");

const findSingleUserMessages = async (req, res, next) => {
  const { id } = req.params;
  try {
    const messasges = await inboxSearvices.findMessageByuserId(id);

    const response = {
      code: 200,
      data: messasges,
      link: {
        self: "/inboxes",
      },
    };

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = findSingleUserMessages;
