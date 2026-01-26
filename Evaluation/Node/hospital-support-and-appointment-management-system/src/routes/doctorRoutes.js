const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getAssignedAppointments, updateAppointment, resolveTicket } = require('../controllers/doctorController');
const router = express.Router();
router.get('/appointments', protect, authorize('doctor'), getAssignedAppointments);
router.put('/appointment/:id', protect, authorize('doctor'), updateAppointment);
router.put('/ticket/:id/resolve', protect, authorize('doctor'), resolveTicket);

module.exports = router;