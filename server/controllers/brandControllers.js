const BrandControllers = require("../models/brandModels");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
  const response = await BrandControllers.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBrand: response ? response : "Cannot create new brand",
  });
});

// get brand
const getBrands = asyncHandler(async (req, res) => {
  const response = await BrandControllers.find();
  return res.status(200).json({
    success: response ? true : false,
    brands: response ? response : "Cannot get brand",
  });
});

// update brand
const updateBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await BrandControllers.findByIdAndUpdate(brid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedBrand: response ? response : "Cannot update brand",
  });
});

// delete brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await BrandControllers.findByIdAndDelete(brid);
  return res.status(200).json({
    success: response ? true : false,
    deletedBrand: response ? response : "Cannot delete brand",
  });
});

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
