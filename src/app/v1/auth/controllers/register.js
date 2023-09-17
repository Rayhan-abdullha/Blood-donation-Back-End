const { createAccount } = require("../../../../lib/auth");
const { generateToken } = require("../../../../lib/token");

const register = async (req, res, next) => {
  const cover = req.cover ?? "";
  const { name, email, password } = req.data;
  try {
    const user = await createAccount({ name, email, password, cover });
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // token generate
    const token = generateToken({ payload });

    // response
    const response = {
      code: 201,
      message: "User Register Successfull",
      data: {
        token,
      },
      links: {
        self: `${req.url}`,
        signin: `${req.url}`,
      },
    };
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = register;
