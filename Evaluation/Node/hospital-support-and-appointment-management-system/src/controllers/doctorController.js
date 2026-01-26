const Appointment = require('../models/Appointment');
const SupportTicket = require('../models/SupportTicket');
const User = require('../models/User');

// @desc    View assigned appointments
// @route   GET /api/doctor/appointments
// @access  Private (Doctor)
exports.getAssignedAppointments = async (req, res, next) => {
  try {
    const { status, date } = req.query;
    
    let query = { doctorId: req.user.id };

    if (status) {
      query.status = status;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.appointmentDate = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email')
      .sort('appointmentDate');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment (add prescription)
// @route   PUT /api/doctor/appointments/:id
// @access  Private (Doctor)
exports.updateAppointment = async (req, res, next) => {
  try {
    const { prescription, status, diagnosis, notes } = req.body;

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      doctorId: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Update appointment
    if (prescription) appointment.prescription = prescription;
    if (status) appointment.status = status;

    await appointment.save();

    // If completed, add to patient's medical history
    if (status === 'completed') {
      await User.findByIdAndUpdate(appointment.patientId, {
        $push: {
          medicalHistory: {
            appointmentId: appointment._id,
            diagnosis: diagnosis || 'Treatment provided',
            notes: notes || prescription || 'No additional notes',
            date: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    View assigned tickets
// @route   GET /api/doctor/tickets
// @access  Private (Doctor)
exports.getAssignedTickets = async (req, res, next) => {
  try {
    const tickets = await SupportTicket.find({
      assignedDoctorId: req.user.id,
    })
      .populate('patientId', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resolve ticket
// @route   PUT /api/doctor/tickets/:id/resolve
// @access  Private (Doctor)
exports.resolveTicket = async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findOne({
      _id: req.params.id,
      assignedDoctorId: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found or not assigned to you',
      });
    }

    if (ticket.status === 'resolved') {
      return res.status(400).json({
        success: false,
        message: 'Ticket already resolved',
      });
    }

    ticket.status = 'resolved';
    ticket.closedAt = new Date();

    await ticket.save();

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update ticket status
// @route   PUT /api/doctor/tickets/:id
// @access  Private (Doctor)
exports.updateTicketStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const ticket = await SupportTicket.findOne({
      _id: req.params.id,
      assignedDoctorId: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found or not assigned to you',
      });
    }

    // Closed tickets cannot be edited
    if (ticket.status === 'resolved') {
      return res.status(400).json({
        success: false,
        message: 'Resolved tickets cannot be edited',
      });
    }

    ticket.status = status;

    if (status === 'resolved') {
      ticket.closedAt = new Date();
    }

    await ticket.save();

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
