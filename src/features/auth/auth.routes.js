// backend/src/features/auth/auth.routes.js
const express = require('express');
const authController = require('./auth.controller');

const router = express.Router();

router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/create-user', authController.createUser);
router.post('/guest-login', authController.guestLogin);

module.exports = router;