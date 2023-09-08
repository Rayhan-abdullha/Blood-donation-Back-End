const { verifyToken } = require("../lib/token");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = verifyToken({ token });
  } catch (err) {
    next(err);
  }
};
