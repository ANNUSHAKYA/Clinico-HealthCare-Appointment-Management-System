import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  image: { type: String },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);
