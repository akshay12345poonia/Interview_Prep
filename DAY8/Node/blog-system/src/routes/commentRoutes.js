const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { validateComment, validateCommentId } = require('../middleware/validation');

/**
 * @route   POST /api/comments
 * @desc    Create a new comment
 * @access  Private
 */
router.post('/', validateComment, commentController.createComment);

/**
 * @route   GET /api/comments
 * @desc    Get all comments
 * @query   page, limit, sortBy, sortOrder
 * @access  Public
 */
router.get('/', commentController.getAllComments);

/**
 * @route   GET /api/comments/recent
 * @desc    Get recent comments
 * @query   limit
 * @access  Public
 */
router.get('/recent', commentController.getRecentComments);

/**
 * @route   GET /api/comments/post/:postId
 * @desc    Get comments by post
 * @query   page, limit, nested=true (for nested replies)
 * @access  Public
 */
router.get('/post/:postId', commentController.getCommentsByPost);

/**
 * @route   GET /api/comments/author/:authorId
 * @desc    Get comments by author
 * @query   page, limit, sortBy, sortOrder
 * @access  Public
 */
router.get('/author/:authorId', commentController.getCommentsByAuthor);

/**
 * @route   GET /api/comments/:id
 * @desc    Get comment by ID
 * @access  Public
 */
router.get('/:id', validateCommentId, commentController.getCommentById);

/**
 * @route   GET /api/comments/:commentId/replies
 * @desc    Get replies to a comment
 * @query   page, limit, sortBy, sortOrder
 * @access  Public
 */
router.get('/:commentId/replies', commentController.getReplies);

/**
 * @route   PUT /api/comments/:id
 * @desc    Update comment
 * @access  Private
 */
router.put('/:id', validateCommentId, commentController.updateComment);

/**
 * @route   DELETE /api/comments/:id
 * @desc    Delete comment (cascading delete for replies)
 * @access  Private
 */
router.delete('/:id', validateCommentId, commentController.deleteComment);

/**
 * @route   POST /api/comments/:id/like
 * @desc    Toggle like on comment
 * @access  Private
 */
router.post('/:id/like', validateCommentId, commentController.toggleLike);

module.exports = router;