const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided. Authentication required.');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new AuthenticationError('Token has expired. Please login again.');
      }
      throw new AuthenticationError('Invalid token. Authentication failed.');
    }

    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      throw new AuthenticationError('User not found. Token is invalid.');
    }

    // Attach user to request object
    req.user = user;
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    next(error);
  }
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user) {
        req.user = user;
        req.userId = decoded.userId;
      }
    }
    
    next();
  } catch (error) {
    // Don't propagate error, just continue without user
    next();
  }
};

module.exports = { authenticate, optionalAuth, AuthenticationError };