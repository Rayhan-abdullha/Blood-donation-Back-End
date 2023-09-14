const { authorizetionError } = require("../utils/errors");
const authorization = (roles = ["admin"]) => {
  return (req, _res, next) => {
    let flag = false;
    req?.user?.role?.map((item) => {
      if (roles.includes(item)) {
        flag = true;
      }
    });
    if (flag) {
      return next();
    }

    return next(authorizetionError());
  };
};

module.exports = authorization;
