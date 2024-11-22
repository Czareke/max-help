    const Product = require('../Model/productModel');
    const catchAsync = require('../utils/catchAsync');
    const AppError = require('../utils/appError');

// Retrieve all products across all catalogs
exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        status: 'success',
        data: { products },
    });
});

// Retrieve a single product by ID
exports.getProductById = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { product },
    });
});

// Create a new product entry
exports.createProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: { product: newProduct },
    });
});

// Update a product by ID
exports.updateProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { product },
    });
});

// Delete a product by ID
exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});