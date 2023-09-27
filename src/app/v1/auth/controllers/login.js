const { loginUser } = require("../../../../lib/auth");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser({ email, password });

    const response = {
      code: 200,
      message: "Login Successfull",
      data: {
        token,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = login;
