const User = require("../../models/User");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
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
module.exports = {
  findUserByEmail,
  existUser,
  createUser,
};
