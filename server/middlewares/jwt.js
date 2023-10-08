const jwt = require("jsonwebtoken");

// hash data
const generateAccessToken = (userid, role) =>
  jwt.sign({ _id: userid, role }, process.env.JWT_SECRET, { expiresIn: "3d" });
const generateRefreshToken = (userid) =>
  jwt.sign({ _id: userid }, process.env.JWT_SECRET, { expiresIn: "7d" });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
