const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/authentication');
const { timing } = require('../middleware/timing');
const { asyncHandler } = require('../middleware/errorHandler');

// Apply middleware chain to all user routes
router.use(timing);
router.use(authenticate);

// User routes
router.get('/', asyncHandler(userController.getAllUsers));
router.get('/:id', asyncHandler(userController.getUserById));
router.put('/:id', asyncHandler(userController.updateUser));
router.delete('/:id', asyncHandler(userController.deleteUser));

module.exports = router;