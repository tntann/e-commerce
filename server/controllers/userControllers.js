const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const makeToken = require("uniqid");

// logic dang ky
// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname } = req.body;
//   if (!email || !password || !firstname || !lastname)
//     return res.status(400).json({
//       success: false,
//       mess: "Missing inputs",
//     });

//   const user = await User.findOne({ email: email });
//   if (user) {
//     throw new Error("User has existed!");
//   } else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       mess: newUser
//         ? "Register is successfully!. Please login"
//         : "Something went wrong",
//     });
//   }
// });

// logic dang ky
const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile)
    return res.status(400).json({
      success: false,
      mess: "Missing inputs",
    });
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User has existed!");
  } else {
    const token = makeToken();
    const emailedited = btoa(email) + "@" + token;
    const newUser = await User.create({
      email: emailedited,
      password,
      firstname,
      lastname,
      mobile,
    });
    if (newUser) {
      const html = `<h4>REGISTER CODE:</h4><br /><span>${token}</span>`;
      await sendMail({
        email,
        html,
        subject: "[He-Mobile] Completed registration He Mobile",
      });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailedited });
    }, [3000000]);
    return res.json({
      success: newUser ? true : false,
      mess: newUser
        ? "Please check your email for registration"
        : "Something went wrong, please try again",
    });
  }
});

// dang ky tai khoan qua email va luu tam vao db
const finalRegister = asyncHandler(async (req, res) => {
  // const cookie = req.cookies;
  const { token } = req.params;
  const notActivedEmail = await User.findOne({
    email: new RegExp(`${token}$`),
  });
  if (notActivedEmail) {
    notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0]);
    notActivedEmail.save();
  }

  return res.json({
    success: notActivedEmail ? true : false,
    mess: notActivedEmail
      ? "Registration is successful. Please login"
      : "Something went wrong, please try again",
  });

  //   const newUser = await User.create({
  //     email: cookie?.dataRegister?.email,
  //     password: cookie?.dataRegister?.password,
  //     firstname: cookie?.dataRegister?.firstname,
  //     lastname: cookie?.dataRegister?.lastname,
  //     mobile: cookie?.dataRegister?.mobile,
  //   });
  //   res.clearCookie("dataRegister");
  //   if (newUser)
  //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`);
  //   else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
});

// logic dang nhap
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      mess: "Missing inputs",
    });

  const response = await User.findOne({ email: email });
  if (response && (await response.isCorrectPassword(password))) {
    // Tách password và role ra khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject();
    // Tạo access token
    const accessToken = generateAccessToken(response._id, role); // Access token => Xác thực người dùng, phân quyền người dùng
    // Tạo refresh token
    const newRefreshToken = generateRefreshToken(response._id); // Refresh token => cấp mới access token
    // Lưu refresh token vào database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    // Lưu refresh token vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

// get a user
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: user ? true : false,
    result: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookie
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  // Check xem token có khớp với token đã lưu trong DB
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched ",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  // Xoá refresh token ở DB
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xoá refresh token cookie trinh duyet
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mess: "Logout successful",
  });
});

// Client gui email
// Server check email co hop le hay ko => Gui mail + kem theo link (password change token)
// Client check mail => click link
// Client gui api kem token
// Check token co giong voi token ma server gui mail hay ko
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `Please click on the link below to change your password. This link will expire after 5 minutes. 
  <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click Here</a>`;

  const data = {
    email,
    html,
    subject: "[He-Mobile] Reset your password",
  };
  const result = await sendMail(data);
  return res.status(200).json({
    success: result.response?.includes("OK") ? true : false,
    mess: result.response?.includes("OK")
      ? "Please check your email"
      : "Something went wrong. Please try again",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!token || !password) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangeAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mess: user ? "Updated password" : "Something went wrong",
  });
});

// lay thoong tin tat ca nguoi dung
const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});

// Xoa User
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : "Something went wrong",
  });
});

// update user by admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(userid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : "Something went wrong",
  });
});

// update address
const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : "Something went wrong",
  });
});

// update Cart
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Missing inputs");
  const user = await User.findById(_id).select("cart");
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid
  );
  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const response = await User.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
      );

      return res.status(200).json({
        success: response ? true : false,
        updateCar: response ? response : "Something went wrong",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updateCar: response ? response : "Something went wrong",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      updateCar: response ? response : "Something went wrong",
    });
  }
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
  finalRegister,
};
