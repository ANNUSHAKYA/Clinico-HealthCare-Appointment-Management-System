import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, enum: ['patient', 'admin'], default: 'patient' },
  googleId: { type: String, required: false },
  facebookId: { type: String, required: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
