const { body, param, validationResult } = require('express-validator');

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation
const validateUser = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  handleValidationErrors
];

// Post validation
const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters'),
  body('author')
    .isMongoId()
    .withMessage('Invalid author ID'),
  body('category')
    .optional()
    .isIn(['technology', 'lifestyle', 'travel', 'food', 'health', 'business', 'entertainment', 'other'])
    .withMessage('Invalid category'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  handleValidationErrors
];

// Comment validation
const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters'),
  body('author')
    .isMongoId()
    .withMessage('Invalid author ID'),
  body('post')
    .isMongoId()
    .withMessage('Invalid post ID'),
  body('parentComment')
    .optional()
    .isMongoId()
    .withMessage('Invalid parent comment ID'),
  handleValidationErrors
];

// ID validation
const validateUserId = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  handleValidationErrors
];

const validatePostId = [
  param('id').isMongoId().withMessage('Invalid post ID'),
  handleValidationErrors
];

const validateCommentId = [
  param('id').isMongoId().withMessage('Invalid comment ID'),
  handleValidationErrors
];

module.exports = {
  validateUser,
  validatePost,
  validateComment,
  validateUserId,
  validatePostId,
  validateCommentId
};