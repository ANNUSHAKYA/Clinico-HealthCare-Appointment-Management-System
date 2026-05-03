import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── In-memory "database" (seeded fresh each cold start) ──────────────
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'clinico_secret_key', { expiresIn: '30d' });

const DOCTORS = [
  { _id: '1', name: 'Dr. Ramesh Kumar',  specialty: 'Cardiology',   experience: 9,  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80', rating: 4.8 },
  { _id: '2', name: 'Dr. Raghav Singh',  specialty: 'Neurology',    experience: 7,  image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80', rating: 4.9 },
  { _id: '3', name: 'Dr. Anjali Singhal',specialty: 'Psychiatry',   experience: 8,  image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80', rating: 4.7 },
  { _id: '4', name: 'Dr. Nandini Sharma',specialty: 'Dermatology',  experience: 5,  image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80', rating: 4.6 },
  { _id: '5', name: 'Dr. Ashutosh Verma',specialty: 'Orthopedics',  experience: 12, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80', rating: 4.5 },
  { _id: '6', name: 'Dr. Priya Mehta',   specialty: 'Pediatrics',   experience: 6,  image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=800&q=80', rating: 4.8 },
];

// Runtime mutable state (shared per serverless warm instance)
let users = [];
let appointments = [];

const ensureAdminSeeded = async () => {
  if (!users.find(u => u.email === 'admin@clinico.com')) {
    const hashed = await bcrypt.hash('admin123', 10);
    users.push({ _id: 'admin-001', name: 'Admin', email: 'admin@clinico.com', password: hashed, role: 'admin' });
  }
};

// ── Auth routes ─────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  await ensureAdminSeeded();
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });
  if (users.find(u => u.email === email))
    return res.status(400).json({ message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { _id: randomUUID(), name, email, password: hashed, role: 'patient' };
  users.push(user);
  res.status(201).json({
    user: { _id: user._id, name, email, role: user.role },
    token: generateToken(user._id),
  });
});

app.post('/api/auth/login', async (req, res) => {
  await ensureAdminSeeded();
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({
    user: { _id: user._id, name: user.name, email, role: user.role },
    token: generateToken(user._id),
  });
});

app.post('/api/auth/google', async (req, res) => {
  await ensureAdminSeeded();
  const { token } = req.body;
  try {
    const resp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) throw new Error('Google API error');
    const { email, name, sub: googleId } = await resp.json();
    if (!email) return res.status(400).json({ message: 'Email not available from Google' });
    let user = users.find(u => u.email === email);
    if (!user) {
      user = { _id: randomUUID(), name, email, googleId, role: 'patient' };
      users.push(user);
    }
    res.json({
      user: { _id: user._id, name: user.name, email, role: user.role },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

app.post('/api/auth/facebook', async (req, res) => {
  await ensureAdminSeeded();
  const { token } = req.body;
  try {
    const resp = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
    const data = await resp.json();
    if (!data.email) return res.status(400).json({ message: 'Email required from Facebook' });
    let user = users.find(u => u.email === data.email);
    if (!user) {
      user = { _id: randomUUID(), name: data.name, email: data.email, facebookId: data.id, role: 'patient' };
      users.push(user);
    }
    res.json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Facebook Auth Error:', err.message);
    res.status(401).json({ message: 'Invalid Facebook token' });
  }
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET || 'clinico_secret_key');
    const user = users.find(u => u._id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// ── Doctor routes ────────────────────────────────────────────────────
app.get('/api/doctors', (_req, res) => res.json({ doctors: DOCTORS }));
app.get('/api/doctors/:id', (req, res) => {
  const doctor = DOCTORS.find(d => d._id === req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json({ doctor });
});

// ── Appointment routes ───────────────────────────────────────────────
app.get('/api/appointments', (_req, res) => res.json({ appointments }));
app.post('/api/appointments', (req, res) => {
  const appt = { _id: randomUUID(), ...req.body, createdAt: new Date() };
  appointments.push(appt);
  res.status(201).json({ appointment: appt });
});

// ── Health check ─────────────────────────────────────────────────────
app.get('/api', (_req, res) => res.json({ status: 'Clinico API running ✓' }));

// Only start HTTP server in non-serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    ensureAdminSeeded().then(() => console.log('✓ Admin user ready'));
  });
}

export default app;
