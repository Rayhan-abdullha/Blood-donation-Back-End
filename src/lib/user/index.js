const User = require("../../models/User");
const defaults = require("../../config");
const { errors } = require("../../utils");
const { singleUserDataTransForom } = require("../../app/v1/user/utils");

const findUsers = async ({
  admin = false,
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  if (!admin) {
    throw authorizetionError();
  }
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const fileter = {
    name: {
      $regex: search,
      $options: "i",
    },
  };
  let users = await User.find(fileter)
    .populate({ path: "volunteer" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
  return users;
};

const findUserInfo = async (id) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  let user = await User.findById(id).populate({ path: "volunteer" });

  if (!user) {
    throw errors.notFound();
  }

  user = { ...user._doc, id: user.id };
  user = singleUserDataTransForom({ user });

  return user;
};

const userOwnership = async ({ user = {}, resourceId = "" }) => {
  if (user.role.includes("admin")) {
    return true;
  }

  if (resourceId) {
    const authUser = await User.findById(resourceId);
    if (authUser) {
      if (user.id === authUser.id) {
        return true;
      } else false;
    }
  }

  return false;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

const findUserByID = async (id) => {
  const user = await User.findById(id);
  return user ? user : false;
};

const existUser = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

const createUser = async ({ name, email, password, cover = "" }) => {
  const user = new User({ name, email, password, cover });
  await user.save();
  return { ...user._doc, id: user.id };
};

const count = async ({ search }) => {
  const fileter = {
    name: {
      $regex: search,
      $options: "i",
    },
  };
  let users = await User.find(fileter);
  return users.length;
};
module.exports = {
  findUserByEmail,
  existUser,
  createUser,
  findUsers,
  findUserByID,
  count,
  findUserInfo,
  userOwnership,
};
