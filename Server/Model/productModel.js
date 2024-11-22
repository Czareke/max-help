    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
    status: { type: String, enum: ['Active', 'Inactive'], required: true },
    image: String,
    productName: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    priceWoWChange: { type: Number, default: 0 },
    atcWoWChange: { type: Number, default: 0 }, // Add-to-Cart Change
    cvrWoWChange: { type: Number, default: 0 }, // Conversion Rate
    impressionsWoWChange: { type: Number, default: 0 },
    profitabilityWoWChange: { type: Number, default: 0 },
    customLabels: [String]
    });

    module.exports = mongoose.model('Product', productSchema);
