const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/status', inventoryController.getInventoryStatus);
router.get('/insights', inventoryController.getInventoryInsights);

module.exports = router;
