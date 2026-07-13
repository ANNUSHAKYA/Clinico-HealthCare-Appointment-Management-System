import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// ── Fallback Memory DB ──────────────
let memoryUsers = [];
let memoryAppointments = [];

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

const ensureAdminSeeded = async () => {
  const hashed = await bcrypt.hash('admin123', 10);
  if (supabase) {
    const { data } = await supabase.from('users').select('*').eq('email', 'admin@clinico.com').single();
    if (!data) {
      await supabase.from('users').insert([{ _id: 'admin-001', name: 'Admin', email: 'admin@clinico.com', password: hashed, role: 'admin' }]);
    }
  } else {
    if (!memoryUsers.find(u => u.email === 'admin@clinico.com')) {
      memoryUsers.push({ _id: 'admin-001', name: 'Admin', email: 'admin@clinico.com', password: hashed, role: 'admin' });
    }
  }
};

// Helper DB functions
const findUserByEmail = async (email) => {
  if (supabase) {
    const { data } = await supabase.from('users').select('*').eq('email', email).single();
    return data;
  }
  return memoryUsers.find(u => u.email === email);
};

const findUserById = async (id) => {
  if (supabase) {
    const { data } = await supabase.from('users').select('*').eq('_id', id).single();
    return data;
  }
  return memoryUsers.find(u => u._id === id);
};

const insertUser = async (user) => {
  if (supabase) {
    await supabase.from('users').insert([user]);
  } else {
    memoryUsers.push(user);
  }
};

// ── Auth routes ─────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  await ensureAdminSeeded();
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
  
  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
  const hashed = await bcrypt.hash(password, 10);
  const user = { _id: randomUUID(), name, email, password: hashed, role: 'patient' };
  
  await insertUser(user);
  
  res.status(201).json({
    user: { _id: user._id, name, email, role: user.role },
    token: generateToken(user._id),
  });
});

app.post('/api/auth/login', async (req, res) => {
  await ensureAdminSeeded();
  const { email, password } = req.body;
  
  const user = await findUserByEmail(email);
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
    
    let user = await findUserByEmail(email);
    if (!user) {
      user = { _id: randomUUID(), name, email, googleId, role: 'patient' };
      await insertUser(user);
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
    
    let user = await findUserByEmail(data.email);
    if (!user) {
      user = { _id: randomUUID(), name: data.name, email: data.email, facebookId: data.id, role: 'patient' };
      await insertUser(user);
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

app.get('/api/auth/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET || 'clinico_secret_key');
    const user = await findUserById(id);
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
app.get('/api/appointments', async (req, res) => {
  let fetchedAppointments = [];
  if (supabase) {
    const { data } = await supabase.from('appointments').select('*').order('createdAt', { ascending: false });
    fetchedAppointments = data || [];
  } else {
    fetchedAppointments = memoryAppointments;
  }
  
  const enriched = fetchedAppointments.map(appt => ({
    ...appt,
    doctor: DOCTORS.find(d => d._id === appt.doctorId) || null,
  }));
  res.json({ appointments: enriched });
});

app.post('/api/appointments', async (req, res) => {
  const { doctorId, date, time, patientName, patientEmail } = req.body;
  const doctor = DOCTORS.find(d => d._id === doctorId) || null;
  const appt = {
    _id: randomUUID(),
    doctorId,
    date,
    time,
    status: 'pending',
    createdAt: new Date(),
  };
  
  if (supabase) {
    await supabase.from('appointments').insert([appt]);
  } else {
    memoryAppointments.push({ ...appt, doctor });
  }

  // Send Email Notification if Resend is configured
  if (resend && patientEmail) {
    try {
      await resend.emails.send({
        from: 'Clinico <onboarding@resend.dev>',
        to: [patientEmail, 'admin@clinico.com'],
        subject: `Appointment Confirmed with Dr. ${doctor?.name || ''}`,
        html: `<p>Your appointment has been successfully requested for ${date} at ${time}.</p>`,
      });
    } catch (e) {
      console.error('Failed to send email', e);
    }
  }

  res.status(201).json({ appointment: { ...appt, doctor } });
});

// ── AI Symptom Checker ───────────────────────────────────────────────
const DEPARTMENT_RULES = [
  { keywords: ['chest pain','chest','heart','palpitation','shortness of breath','breathing'], department: 'Cardiology', category: 'Cardiologist', urgency: 'High' },
  { keywords: ['headache','migraine','seizure','memory','confusion','numbness','dizziness'], department: 'Neurology', category: 'Neurologist', urgency: 'Medium' },
  { keywords: ['anxiety','depression','stress','mental','panic','mood','insomnia','sleep'], department: 'Psychiatry', category: 'Psychiatrist', urgency: 'Medium' },
  { keywords: ['rash','skin','acne','eczema','itching','psoriasis','hair loss'], department: 'Dermatology', category: 'Dermatologist', urgency: 'Low' },
  { keywords: ['bone','joint','knee','back pain','spine','fracture','arthritis','muscle'], department: 'Orthopedics', category: 'Orthopedic Surgeon', urgency: 'Medium' },
  { keywords: ['child','baby','infant','fever in child','pediatric','toddler'], department: 'Pediatrics', category: 'Pediatrician', urgency: 'Medium' },
  { keywords: ['cough','cold','flu','throat','sore throat','runny nose','congestion','fever'], department: 'General Medicine', category: 'General Physician', urgency: 'Low' },
  { keywords: ['stomach','nausea','vomiting','diarrhea','constipation','abdomen','gastric'], department: 'Gastroenterology', category: 'Gastroenterologist', urgency: 'Medium' },
  { keywords: ['eye','vision','blur','redness in eye'], department: 'Ophthalmology', category: 'Ophthalmologist', urgency: 'Medium' },
  { keywords: ['ear','hearing','tinnitus','ear pain'], department: 'ENT', category: 'ENT Specialist', urgency: 'Low' },
];

const fallbackSymptomAnalysis = (symptoms) => {
  const lower = symptoms.toLowerCase();
  for (const rule of DEPARTMENT_RULES) {
    if (rule.keywords.some(k => lower.includes(k))) {
      return {
        department: rule.department,
        doctorCategory: rule.category,
        urgencyLevel: rule.urgency,
        reasoning: `Based on your symptoms, we recommend consulting a ${rule.category} in the ${rule.department} department.`,
        disclaimer: 'This is an AI-generated suggestion for informational purposes only. Please consult a doctor for professional medical advice.'
      };
    }
  }
  return {
    department: 'General Medicine',
    doctorCategory: 'General Physician',
    urgencyLevel: 'Low',
    reasoning: 'Your symptoms suggest a general health concern. A General Physician can help assess and refer you appropriately.',
    disclaimer: 'This is an AI-generated suggestion for informational purposes only. Please consult a doctor for professional medical advice.'
  };
};

app.post('/api/ai/symptom-check', async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || symptoms.trim().length < 3) {
    return res.status(400).json({ message: 'Please describe your symptoms in more detail.' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.json(fallbackSymptomAnalysis(symptoms));
  }

  try {
    const prompt = `You are a medical triage assistant. A patient describes these symptoms: "${symptoms}"

Respond ONLY with a JSON object (no markdown, no code fences) with these exact keys:
- department: (e.g., Cardiology, Neurology, General Medicine)
- doctorCategory: (e.g., Cardiologist, General Physician)
- urgencyLevel: (exactly one of: "High", "Medium", or "Low")
- reasoning: (1-2 sentences explaining the recommendation)
- disclaimer: "This is an AI-generated suggestion for informational purposes only. Please consult a doctor for professional medical advice."

Return only valid JSON.`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 512 }
        })
      }
    );

    if (!geminiRes.ok) throw new Error('Gemini API error');
    const geminiData = await geminiRes.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    const cleaned = rawText.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return res.json(parsed);
  } catch (err) {
    console.error('Gemini Error, using fallback:', err.message);
    return res.json(fallbackSymptomAnalysis(symptoms));
  }
});

// ── Health check ─────────────────────────────────────────────────────
app.get('/api', (_req, res) => res.json({ status: 'Clinico API running ✓ | DB: ' + (supabase ? 'Supabase' : 'Memory') }));

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    ensureAdminSeeded().then(() => console.log('✓ Admin user ready'));
  });
}

export default app;
