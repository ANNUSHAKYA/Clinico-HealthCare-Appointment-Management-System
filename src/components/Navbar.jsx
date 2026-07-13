import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">C</div>
          Clinico
        </Link>
        <div className="nav-links">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/doctors" className={isActive("/doctors")}>Doctors</Link>
          <Link to="/symptom-checker" className={`nav-ai-link ${isActive("/symptom-checker")}`}>
            ✨ AI Symptom Checker
          </Link>
          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>
        </div>
        <div className="nav-auth">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <ShieldCheck size={18} /> Admin
                </Link>
              )}
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn btn-outline" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/admin" style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.95rem" }}>
                <ShieldCheck size={18} /> Admin
              </Link>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
