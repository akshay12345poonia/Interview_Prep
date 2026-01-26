const User = require('../models/User');
const Appointment = require('../models/Appointment');
const SupportTicket = require('../models/SupportTicket');

exports.getSystemStats = async (req, res, next) => {
  try {
    // 1. Total Counts
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalDoctors = await User.countDocuments({ role: 'doctor' });

    // 2. Doctor Workload (Appointments per Doctor)
    const doctorWorkload = await Appointment.aggregate([
      {
        $group: {
          _id: '$doctorId',
          totalAppointments: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'doctorDetails'
        }
      },
      { $unwind: '$doctorDetails' },
      {
        $project: {
          doctorName: '$doctorDetails.name',
          totalAppointments: 1
        }
      }
    ]);

    // 3. Tickets by Priority
    const ticketsByPriority = await SupportTicket.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // 4. Monthly Stats
    const monthlyStats = await Appointment.aggregate([
        {
            $group: {
                _id: { $month: "$appointmentDate" },
                count: { $sum: 1 }
            }
        }
    ]);

    res.json({
      totalPatients,
      totalDoctors,
      doctorWorkload,
      ticketsByPriority,
      monthlyStats
    });
  } catch (error) {
    next(error);
  }
};