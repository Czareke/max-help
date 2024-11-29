const Product = require('../Model/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Retrieve all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        status: 'success',
        results: products.length,
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
    try {
        console.log("Received payload:", req.body); // Log incoming data

        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { product: newProduct },
        });
    } catch (err) {
        console.error("Error creating product:", err); // Log error details
        next(new AppError("Failed to create product", 500)); // Send a meaningful error
    }
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
