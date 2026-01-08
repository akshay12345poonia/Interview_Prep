const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../middleware/validation');

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', validateUser, userController.createUser);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @query   page, limit, sortBy, sortOrder, search, role, isActive
 * @access  Public
 */
router.get('/', userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @query   include=relations (to include posts and comments)
 * @access  Public
 */
router.get('/:id', validateUserId, userController.getUserById);

/**
 * @route   GET /api/users/username/:username
 * @desc    Get user by username
 * @access  Public
 */
router.get('/username/:username', userController.getUserByUsername);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private (should be protected with auth middleware)
 */
router.put('/:id', validateUserId, userController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user (cascading delete)
 * @access  Private (should be protected with auth middleware)
 */
router.delete('/:id', validateUserId, userController.deleteUser);

/**
 * @route   GET /api/users/:id/posts
 * @desc    Get user's posts
 * @query   page, limit
 * @access  Public
 */
router.get('/:id/posts', validateUserId, userController.getUserPosts);

/**
 * @route   GET /api/users/:id/comments
 * @desc    Get user's comments
 * @query   page, limit
 * @access  Public
 */
router.get('/:id/comments', validateUserId, userController.getUserComments);

module.exports = router;