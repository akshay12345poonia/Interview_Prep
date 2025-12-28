const User = require('../models/User');

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
};

// Get user dashboard
exports.getDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to your dashboard, ${req.user.username}!`,
    user: req.user
  });
};