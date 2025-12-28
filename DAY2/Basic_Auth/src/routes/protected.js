const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basicAuth');
const { cookieAuth, isAdmin } = require('../middleware/cookieAuth');
const { getDashboard, getAllUsers } = require('../controllers/userController');

// Route protected with Basic Authentication
router.get('/basic', basicAuth, (req, res) => {
  res.json({
    success: true,
    message: 'This route is protected with Basic Authentication',
    user: req.user
  });
});

// Route protected with Cookie/JWT Authentication
router.get('/dashboard', cookieAuth, getDashboard);

// Admin only route (requires both authentication and admin role)
router.get('/admin/users', cookieAuth, isAdmin, getAllUsers);

// Route that accepts both authentication methods
router.get('/flexible', (req, res, next) => {
  // Try cookie auth first
  if (req.cookies.token) {
    return cookieAuth(req, res, next);
  }
  // Fall back to basic auth
  basicAuth(req, res, next);
}, (req, res) => {
  res.json({
    success: true,
    message: 'This route accepts both Basic and Cookie authentication',
    user: req.user
  });
});

module.exports = router;