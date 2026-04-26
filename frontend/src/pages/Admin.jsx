import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password });
      if (data.user.role !== 'admin') {
        throw new Error("Unauthorized: Admin access only");
      }
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "#1e293b",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "var(--white)",
        width: "100%",
        maxWidth: "450px",
        borderRadius: "var(--radius)",
        padding: "40px 30px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            width: "60px", height: "60px", background: "#1e293b",
            borderRadius: "50%", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 15px", color: "var(--white)"
          }}>
            <Shield size={30} />
          </div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "5px" }}>Admin Login</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Access the Clinico admin panel</p>
        </div>

        {error && <div style={{ color: "#ef4444", background: "#fee2e2", padding: "10px", borderRadius: "6px", marginBottom: "20px", textAlign: "center", fontSize: "0.9rem" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }}>@</span>
              <input 
                type="email" 
                placeholder="admin@clinico.com"
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 12px 12px 35px", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Shield size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
              <input 
                type="password" 
                placeholder="Enter admin password"
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "12px 35px", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
              <Eye size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", cursor: "pointer" }} />
            </div>
          </div>

          <button type="submit" style={{ width: "100%", padding: "14px", background: "#1e293b", color: "var(--white)", borderRadius: "8px", fontWeight: 600, fontSize: "1rem" }} disabled={loading}>
            {loading ? "Verifying..." : "Login to Admin Panel"}
          </button>
        </form>

        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "15px", marginTop: "25px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <p style={{ marginBottom: "5px" }}>Demo Credentials:</p>
          <p>Email: admin@clinico.com</p>
          <p>Password: admin123</p>
        </div>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
            <ArrowLeft size={16} /> Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  );
}
