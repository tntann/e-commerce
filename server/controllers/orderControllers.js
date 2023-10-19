const Order = require("../models/orderModels");
const User = require("../models/userModels");
const Coupon = require("../models/couponModels");
const asyncHandler = require("express-async-handler");

// Create new order
const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");
  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));
  let total = userCart?.cart?.reduce(
    (sum, el) => el.product.price * el.quantity + sum,
    0
  );
  const createData = { products, total, orderBy: _id };
  if (coupon) {
    const selectCoupon = await Coupon.findById(coupon);
    total =
      Math.round((total * (1 - +selectCoupon?.discount / 100)) / 1000) * 1000 ||
      total;
    createData.total = total;
    createData.coupon = coupon;
  }
  const rs = await Order.create(createData);
  return res.status(200).json({
    success: rs ? true : false,
    rs: rs ? rs : "Something went wrong",
  });
});

// update status by admin
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Invalid status");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  });
});

// get order by user
const getOrderUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  });
});

// get orders by admin
const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getOrderUser,
  getOrders,
};
