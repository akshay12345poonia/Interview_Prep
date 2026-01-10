const express = require('express');
const router = express.Router();

// Import controllers
const queryController = require('../controllers/queryController');
const indexController = require('../controllers/indexController');

// Query Analysis Routes
router.post('/api/analyze', queryController.analyzeQuery);
router.get('/api/patterns', queryController.getPatterns);
router.get('/api/stats', queryController.getStats);

// Index Recommendation Routes
router.post('/api/recommendations/generate', indexController.generateRecommendations);
router.get('/api/recommendations', indexController.getRecommendations);
router.patch('/api/recommendations/:recommendationId/apply', indexController.applyRecommendation);
router.patch('/api/recommendations/:recommendationId/reject', indexController.rejectRecommendation);

// Health Check
router.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;