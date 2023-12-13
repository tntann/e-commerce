const Order = require("../models/orderModels");
const User = require("../models/userModels");
const Coupon = require("../models/couponModels");
const asyncHandler = require("express-async-handler");

// Create new order
const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, orderBy: _id };
  if (status) data.status = status;
  const rs = await Order.create(data);
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
    mess: response ? "Updated successful" : "Something went wrong",
  });
});

// get order by user
const getUserOrder = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { _id } = req.user;
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  const qr = { ...formatedQueries, orderBy: _id };
  let queryCommand = Order.find(qr);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" "); // abc,efg => [abc, efg] => abc efg
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  // Số lượng sp thoã mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  try {
    const response = await queryCommand.exec();

    const counts = await Order.find(qr).countDocuments();

    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get orders",
    });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// get orders by admin
const getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  const qr = { ...formatedQueries };
  let queryCommand = Order.find(qr).populate("orderBy", "firstname lastname");

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" "); // abc,efg => [abc, efg] => abc efg
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  // Số lượng sp thoã mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  try {
    const response = await queryCommand.exec();

    const counts = await Order.find(qr).countDocuments();

    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get orders",
    });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const deleteOrderByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rs = await Order.findByIdAndDelete(id);
  return res.json({
    success: rs ? true : false,
    mess: rs ? "Deleted" : "Something went wrong",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
  deleteOrderByAdmin,
};
