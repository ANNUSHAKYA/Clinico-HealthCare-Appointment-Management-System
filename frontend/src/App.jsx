import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar          from "./components/Navbar";
import Footer          from "./components/Footer";
import Home            from "./pages/Home";
import Doctors         from "./pages/Doctors";
import Login           from "./pages/Login";
import Register        from "./pages/Register";
import Dashboard       from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import About           from "./pages/About";
import Contact         from "./pages/Contact";
import Admin           from "./pages/Admin";

const Spinner = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
    <div className="spinner" />
  </div>
);

const Private = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? children : <Navigate to="/login" replace />;
};

const Public = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/doctors"   element={<Doctors />} />
        <Route path="/about"     element={<About />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/admin"     element={<Public><Admin /></Public>} />
        <Route path="/login"     element={<Public><Login /></Public>} />
        <Route path="/register"  element={<Public><Register /></Public>} />
        <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        <Route path="/book/:id"  element={<Private><BookAppointment /></Private>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
