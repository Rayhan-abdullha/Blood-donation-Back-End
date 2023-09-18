const { verifyToken } = require("../lib/token");
const userSearvice = require("../lib/user");
const { authenticationError } = require("../utils/errors");
const isAdmin = async (req, _res, next) => {
  if (req.headers.authorization === undefined) {
    req.admin = false;
    return next();
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      req.admin = false;
      return next();
    }
    const decoded = verifyToken({ token });
    const user = await userSearvice.findUserByEmail(decoded.email);

    if (!user) {
      req.admin = false;
      return next();
    }

    if (!user.role.includes("admin")) {
      req.admin = false;
      return next();
    }
    req.admin = { ...user._doc, id: user.id };
    next();
  } catch (err) {
    req.admin = false;
    return next();
  }
};

module.exports = isAdmin;
