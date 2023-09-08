require("dotenv").config();
const { errors } = require("../../utils");
const jwt = require("jsonwebtoken");

const generateToken = ({
  payload,
  secret = process.env.ACCESS_TOKEN_SECRET,
  algorithm = "HS256",
}) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: "2h", algorithm });
  } catch (err) {
    throw errors.serverError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, algorithm);
  } catch (err) {
    throw errors.serverError();
  }
};
const verifyToken = ({
  token,
  secret = process.env.ACCESS_TOKEN_SECRET,
  algorithm = "HS256",
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (err) {
    throw errors.serverError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};
