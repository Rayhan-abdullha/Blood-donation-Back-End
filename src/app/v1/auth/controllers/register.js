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
      cover: user.cover,
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
        self: "/auth/register",
        signin: "/auth/signin",
      },
    };
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = register;
