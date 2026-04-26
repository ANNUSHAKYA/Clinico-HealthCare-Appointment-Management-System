import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      res.json({ doctor });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
