
const AppError = require('../utils/appError');

/**
 * Middleware to restrict access based on user roles.
 * @param {...String} roles - List of allowed roles (e.g., 'admin', 'doctor')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user is set by the authMiddleware (protect)
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

module.exports = { restrictTo };