const login = (req, res, next) => {
  const { name, email, password } = req.body;
  try {
  } catch (err) {
    next(err);
  }
};
module.exports = login;
