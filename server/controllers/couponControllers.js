const Coupon = require("../models/couponModels");
const asyncHandler = require("express-async-handler");

// Create a coupon
const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, discount, exp } = req.body;
  if (!name || !discount || !exp) throw new Error("Missing inputs");
  const response = await Coupon.create({
    ...req.body,
    exp: Date.now() + +exp * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response ? response : "Cannot create new coupon",
  });
});

// Get a coupon
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: response ? true : false,
    Coupons: response ? response : "Cannot get coupon",
  });
});

// update coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { cpid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.exp)
    req.body.exp = Date.now() + +req.body.exp * 24 * 60 * 60 * 1000;
  const response = await Coupon.findByIdAndUpdate(cpid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedCoupon: response ? response : "Cannot update coupon",
  });
});

// delete coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cpid } = req.params;
  const response = await Coupon.findByIdAndDelete(cpid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    deletedCoupon: response ? response : "Cannot delete coupon",
  });
});

module.exports = {
  createNewCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
