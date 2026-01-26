const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { bookAppointment, getDoctors, raiseTicket } = require('../controllers/patientController');
const router = express.Router();
router.get('/doctors', protect, getDoctors); 
router.post('/book', protect, authorize('patient'), bookAppointment);
router.post('/ticket', protect, authorize('patient'), raiseTicket);

module.exports = router;