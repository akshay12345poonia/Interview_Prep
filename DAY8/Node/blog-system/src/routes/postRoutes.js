const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost, validatePostId } = require('../middleware/validation');

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
router.post('/', validatePost, postController.createPost);

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 * @query   page, limit, sortBy, sortOrder, search, status, category, author
 * @access  Public
 */
router.get('/', postController.getAllPosts);

/**
 * @route   GET /api/posts/trending
 * @desc    Get trending posts
 * @query   limit
 * @access  Public
 */
router.get('/trending', postController.getTrendingPosts);

/**
 * @route   GET /api/posts/popular
 * @desc    Get popular posts (most likes)
 * @query   limit
 * @access  Public
 */
router.get('/popular', postController.getPopularPosts);

/**
 * @route   GET /api/posts/recent
 * @desc    Get recent posts
 * @query   limit
 * @access  Public
 */
router.get('/recent', postController.getRecentPosts);

/**
 * @route   GET /api/posts/search
 * @desc    Search posts
 * @query   q (search term), page, limit, sortBy, sortOrder
 * @access  Public
 */
router.get('/search', postController.searchPosts);

/**
 * @route   GET /api/posts/author/:authorId
 * @desc    Get posts by author
 * @query   page, limit, sortBy, sortOrder
 * @access  Public
 */
router.get('/author/:authorId', postController.getPostsByAuthor);

/**
 * @route   GET /api/posts/category/:category
 * @desc    Get posts by category
 * @query   page, limit, sortBy, sortOrder
 * @access  Public
 */
router.get('/category/:category', postController.getPostsByCategory);

/**
 * @route   GET /api/posts/tag/:tag
 * @desc    Get posts by tag
 * @query   page, limit, sortBy, sortOrder
 * @access  Public
 */
router.get('/tag/:tag', postController.getPostsByTag);

/**
 * @route   GET /api/posts/:id
 * @desc    Get post by ID
 * @query   comments=true (to include comments)
 * @access  Public
 */
router.get('/:id', validatePostId, postController.getPostById);

/**
 * @route   PUT /api/posts/:id
 * @desc    Update post
 * @access  Private
 */
router.put('/:id', validatePostId, postController.updatePost);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete post (cascading delete)
 * @access  Private
 */
router.delete('/:id', validatePostId, postController.deletePost);

/**
 * @route   POST /api/posts/:id/like
 * @desc    Toggle like on post
 * @access  Private
 */
router.post('/:id/like', validatePostId, postController.toggleLike);

module.exports = router;