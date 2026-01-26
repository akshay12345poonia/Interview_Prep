const Appointment = require('../models/Appointment');
const SupportTicket = require('../models/SupportTicket');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Book appointment
// @route   POST /api/patient/appointments
// @access  Private (Patient)
exports.bookAppointment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { doctorId, appointmentDate, symptoms } = req.body;
    const patientId = req.user.id;

    // Verify doctor exists and is active
    const doctor = await User.findOne({
      _id: doctorId,
      role: 'doctor',
      isActive: true,
    });

    if (!doctor) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Doctor not found or inactive',
      });
    }

    // Check for overlapping appointments
    const appointmentDateTime = new Date(appointmentDate);
    const startTime = new Date(appointmentDateTime.getTime() - 30 * 60000); // 30 min before
    const endTime = new Date(appointmentDateTime.getTime() + 30 * 60000); // 30 min after

    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      status: 'booked',
      appointmentDate: {
        $gte: startTime,
        $lte: endTime,
      },
    });

    if (overlappingAppointment) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Doctor has overlapping appointment at this time',
      });
    }

    // Create appointment
    const appointment = await Appointment.create(
      [
        {
          patientId,
          doctorId,
          appointmentDate: appointmentDateTime,
          symptoms,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      data: appointment[0],
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc    View own appointments
// @route   GET /api/patient/appointments
// @access  Private (Patient)
exports.getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id,
    })
      .populate('doctorId', 'name specialization email')
      .sort('-appointmentDate');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel appointment
// @route   PUT /api/patient/appointments/:id/cancel
// @access  Private (Patient)
exports.cancelAppointment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patientId: req.user.id,
    });

    if (!appointment) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    if (appointment.status === 'cancelled') {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Appointment already cancelled',
      });
    }

    // Update appointment status
    appointment.status = 'cancelled';
    await appointment.save({ session });

    // Add to medical history
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          medicalHistory: {
            appointmentId: appointment._id,
            diagnosis: 'Appointment Cancelled',
            notes: `Cancelled on ${new Date().toLocaleDateString()}`,
            date: new Date(),
          },
        },
      },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc    Raise support ticket
// @route   POST /api/patient/tickets
// @access  Private (Patient)
exports.raiseSupportTicket = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await SupportTicket.create({
      title,
      description,
      priority,
      patientId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    View own support tickets
// @route   GET /api/patient/tickets
// @access  Private (Patient)
exports.getMyTickets = async (req, res, next) => {
  try {
    const tickets = await SupportTicket.find({
      patientId: req.user.id,
    })
      .populate('assignedDoctorId', 'name email')
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
