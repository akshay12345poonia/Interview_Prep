
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Middleware to protect routes. 
 * Verifies JWT and attaches current user to req.user
 */
const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2. Verify token
  // promisify jwt.verify is safer, but standard verify works if wrapped in try/catch or callback
  // Here we use synchronous verification for simplicity within async handler
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 4. Check if user is active (Soft delete check)
  if (currentUser.isActive === false) {
    return next(new AppError('User account is deactivated.', 401));
  }

  // Grant access
  req.user = currentUser;
  next();
});

module.exports = { protect };