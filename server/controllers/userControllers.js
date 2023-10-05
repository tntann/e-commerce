const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

// logic dang ky
const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      sucess: false,
      mess: "Missing inputs",
    });

  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User đã tồn tại!");
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      mess: newUser
        ? "Register is successfully!. Please login"
        : "Something went wrong",
    });
  }
});

// logic dang nhap
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      mess: "Missing inputs",
    });

  const response = await User.findOne({ email: email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    return res.status(200).json({
      sucess: true,
      userData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

module.exports = {
  register,
  login,
};
