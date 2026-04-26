# 🏥 Clinico - Healthcare Management System

A full-stack MERN-style healthcare web application built with **React + Vite** (frontend) and **Node.js + Express** (backend).

## 🚀 Features
- 🔐 JWT-based authentication (Login & Register)
- 🌐 Google OAuth Sign-In
- 👨‍⚕️ Doctor listing with search & filter
- 📅 Appointment booking system
- 🛡️ Admin dashboard with role-based access control
- 📱 Fully responsive design

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router, Lucide Icons |
| Backend | Node.js, Express.js |
| Auth | JWT, Google OAuth 2.0 |
| Styling | Vanilla CSS with custom design tokens |

## ⚙️ Setup

### 1. Clone & Install

```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 2. Environment Variables

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5002/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

**`backend/.env`**
```env
PORT=5002
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Run

```bash
# Start backend (from /backend)
node server.js

# Start frontend (from /frontend)
npm run dev
```

## 🔐 Default Admin Credentials

```
Email: admin@clinico.com
Password: admin123
```

> Navigate to `/admin` for the admin login panel.

## 📁 Project Structure

```
Clinico/
├── frontend/
│   └── src/
│       ├── pages/       (Home, Doctors, Login, Register, About, Contact, Admin)
│       ├── components/  (Navbar, Footer)
│       ├── context/     (AuthContext)
│       └── api/         (axios config)
└── backend/
    ├── server.js        (Express server with in-memory store)
    └── routes/          (auth, doctor, appointment routes)
```
