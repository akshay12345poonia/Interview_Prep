const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getSystemStats } = require('../controllers/adminController');
const router = express.Router();

router.get('/stats', protect, authorize('admin'), getSystemStats);

module.exports = router;