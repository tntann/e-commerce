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
    response: response ? response : "Something went wrong",
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
  // let colorQueryObject = {};
  // // Filtering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" };
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatedQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //       { description: { $regex: queries.q, $options: 'i' } },
  //     ],
  //   };
  // }
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
  // let colorQueryObject = {};
  // // Filtering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" };
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatedQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //       { description: { $regex: queries.q, $options: 'i' } },
  //     ],
  //   };
  // }
  const qr = { ...formatedQueries };
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

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
