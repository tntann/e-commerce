const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      sucess: false,
      mess: "Missing inputs",
    });
  const response = await User.create(req.body);
  return res.status(200).json({
    sucess: response ? true : false,
    response,
  });
});

module.exports = {
  register,
};
