const bcrypt = require("bcryptjs");
const generatehash = async (payload, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(payload, salt);
  return hash;
};

const comparePassword = async (raw, hash) => {
  return await bcrypt.compare(raw, hash);
};

module.exports = {
  generatehash,
  comparePassword,
};
