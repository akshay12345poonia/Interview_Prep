const express = require('express');
const router = express.Router();
const { 
  rateLimiter, 
  resetRateLimit, 
  resetAllRateLimits,
  getRateLimitStatus,
  getAllRateLimitStatuses
} = require('../middleware/rateLimiter');

// Apply rate limiter to all API routes
router.use(rateLimiter);

// Test routes
router.get('/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

router.post('/data', (req, res) => {
  res.json({
    status: 'success',
    message: 'Data received',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

router.get('/users', (req, res) => {
  res.json({
    status: 'success',
    users: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]
  });
});

// Admin routes (no rate limiting for admin operations)
router.get('/admin/rate-limits', (req, res) => {
  const statuses = getAllRateLimitStatuses();
  res.json({
    status: 'success',
    count: statuses.length,
    rateLimits: statuses
  });
});

router.get('/admin/rate-limit/:ip', (req, res) => {
  const status = getRateLimitStatus(req.params.ip);
  res.json({
    status: 'success',
    rateLimit: status
  });
});

router.delete('/admin/rate-limit/:ip', (req, res) => {
  const deleted = resetRateLimit(req.params.ip);
  res.json({
    status: 'success',
    message: deleted ? 'Rate limit reset successfully' : 'IP not found',
    ip: req.params.ip
  });
});

router.delete('/admin/rate-limits', (req, res) => {
  const count = resetAllRateLimits();
  res.json({
    status: 'success',
    message: 'All rate limits reset',
    cleared: count
  });
});

module.exports = router;