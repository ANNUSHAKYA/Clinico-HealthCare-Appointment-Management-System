import express from 'express';
import Appointment from '../models/Appointment.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { doctorId, date, time } = req.body;
  try {
    const appointment = new Appointment({
      user: req.user._id,
      doctor: doctorId,
      date,
      time
    });
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('doctor', 'name specialty')
      .sort({ date: 1 });
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
