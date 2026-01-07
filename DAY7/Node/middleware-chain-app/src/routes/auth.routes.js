const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/authentication');
const { timing } = require('../middleware/timing');
const { asyncHandler } = require('../middleware/errorHandler');

// Apply timing middleware to all auth routes
router.use(timing);

// Public routes
router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));

// Protected routes
router.get('/me', authenticate, asyncHandler(authController.getMe));

module.exports = router;