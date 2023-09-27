const inboxSearvices = require("../../../../lib/inbox");
const deleteSingleMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    await inboxSearvices.deleteMessage({ id });
    const response = {
      code: 200,
      message: "Deleted successfull",
    };
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteSingleMessage;
