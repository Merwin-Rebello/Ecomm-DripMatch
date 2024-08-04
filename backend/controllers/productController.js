const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
//catchAsyncErrors is a module in the middleware which basically does try and catch so here in hte crud operations the lines of code will be less and
// the code will be more efficient .So first it will go to the catchasyncerror file in middle ware where there is try and catch function present
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
//create product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});
//get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products,
  });
});

//update product --admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id); //we can get the particular product id
  if (!product) {
    // using next which is a call back function
    return next(new ErrorHandler("Product not found", 404));
  }
  // res.status(500).json({     basic way to handle error is fine
  //   success: false,
  //   message: "product not found",
  // });

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});
//delete product --admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
