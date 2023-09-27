const { verifyToken } = require("../lib/token");
const userSearvice = require("../lib/user");
const { authenticationError } = require("../utils/errors");

const authenticate = async (req, _res, next) => {
  if (req.headers.authorization === undefined) {
    return next(authenticationError());
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return next(authenticationError());
    }
    const decoded = verifyToken({ token });
    const user = await userSearvice.findUserByEmail(decoded.email);

    if (!user) {
      next(authenticationError());
    }

    if (!user.role.includes("user")) {
      next(authenticationError("You are Unauthorized"));
    }
    req.user = { ...user._doc, id: user.id };
    return next();
  } catch (err) {
    next(authenticationError());
  }
};

module.exports = authenticate;
