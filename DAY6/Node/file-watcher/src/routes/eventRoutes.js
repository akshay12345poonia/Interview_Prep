const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Routes
router.get('/', eventController.getAllEvents);
router.get('/stats', eventController.getEventStats);
router.get('/type/:type', eventController.getEventsByType);
router.get('/:id', eventController.getEventById);
router.delete('/', eventController.clearEvents);

module.exports = router;