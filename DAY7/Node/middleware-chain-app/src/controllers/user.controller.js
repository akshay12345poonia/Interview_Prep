const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');
const { getRequestTiming } = require('../middleware/timing');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    const timing = getRequestTiming(req);

    res.status(200).json({
      success: true,
      count: users.length,
      timing: timing ? `${timing}ms` : null,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};