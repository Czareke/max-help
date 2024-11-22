const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.createUser);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMe', authController.updateMe);

module.exports = router;
