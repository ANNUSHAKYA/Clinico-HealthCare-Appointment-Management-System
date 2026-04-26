import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from './models/Doctor.js';

dotenv.config();

const sampleDoctors = [
  {
    name: "Ramesh",
    specialty: "Cardiology",
    experience: 9,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    rating: 4.8
  },
  {
    name: "Raghav Singh",
    specialty: "Neurology",
    experience: 7,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80",
    rating: 4.9
  },
  {
    name: "Anjali Singhal",
    specialty: "Psychiatry",
    experience: 8,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    rating: 4.7
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clinico')
  .then(async () => {
    console.log('MongoDB connected');
    await Doctor.deleteMany({});
    await Doctor.insertMany(sampleDoctors);
    console.log('Doctors seeded');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
