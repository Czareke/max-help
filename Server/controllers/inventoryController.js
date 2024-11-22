    const SKU = require('../Model/skuModel');
    const catchAsync = require('../utils/catchAsync');
    const AppError = require('../utils/appError');

    // Get SKU inventory metrics
    exports.getInventoryStatus = catchAsync(async (req, res, next) => {
    const activeCount = await SKU.countDocuments({ status: 'active' });
    const inactiveCount = await SKU.countDocuments({ status: 'inactive' });
    const totalCount = activeCount + inactiveCount;

    res.status(200).json({
        status: 'success',
        data: { activeCount, inactiveCount, totalCount },
    });
    });

    // Get detailed inventory insights
    exports.getInventoryInsights = catchAsync(async (req, res, next) => {
    const insights = await SKU.find({});

    res.status(200).json({
        status: 'success',
        data: { insights },
    });
    });
