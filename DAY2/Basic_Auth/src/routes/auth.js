const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const { cookieAuth } = require('../middleware/cookieAuth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', cookieAuth, getMe);

module.exports = router;