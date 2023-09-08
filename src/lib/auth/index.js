const { errors } = require("../../utils");
const { hasing } = require("../../utils");
const { existUser, findUserByEmail } = require("../user");
const { createUser } = require("../../lib/user");
const { BadRequest } = require("../../utils/errors");
const { generateToken } = require("../token");

const createAccount = async ({ name, email, password, cover = "" }) => {
  if (!name || !email || !password) {
    throw errors.BadRequest();
  }
  // find user
  const hasUser = await existUser(email);
  if (hasUser) {
    throw errors.BadRequest("User already exist!", 409);
  }
  // hash password
  const hash = await hasing.generatehash(password);
  const user = await createUser({ name, email, password: hash, cover });
  return user;
};

const loginUser = async ({ email, password }) => {
  const hasUser = await findUserByEmail(email);
  if (!hasUser) {
    throw BadRequest("Invalid Credential");
  }

  const isMatch = await hasing.comparePassword(password, hasUser.password);
  if (!isMatch) {
    throw BadRequest("Invalid Credential");
  }

  const payload = {
    id: hasUser.id,
    name: hasUser.name,
    email: hasUser.email,
    role: hasUser.role,
    cover: hasUser.cover,
  };

  // token generate
  const token = generateToken({ payload });
  return token;
};

module.exports = {
  createAccount,
  loginUser,
};
