import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User as UserIcon, Mail, Phone, Lock, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    scope: 'openid email profile',
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const { data } = await API.post('/auth/google', { token: tokenResponse.access_token });
        login(data.token, data.user);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || "Google signup failed");
        setLoading(false);
      }
    },
    onError: errorResponse => setError("Google signup failed")
  });

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        setLoading(true);
        const { data } = await API.post('/auth/facebook', { token: response.accessToken, userID: response.userID });
        login(data.token, data.user);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || "Facebook signup failed");
        setLoading(false);
      }
    } else {
      setError("Facebook signup failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "80px 20px", background: "var(--green-light)", minHeight: "calc(100vh - 150px)" }}>
      <div style={{
        background: "var(--white)",
        maxWidth: "450px",
        margin: "0 auto",
        borderRadius: "var(--radius)",
        padding: "40px 30px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            width: "60px", height: "60px", background: "var(--green)",
            borderRadius: "50%", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 15px", color: "var(--white)",
            fontSize: "1.5rem", fontWeight: "bold"
          }}>
            C
          </div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "5px" }}>Create Account</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Join Clinico for better healthcare management</p>
        </div>

        {error && <div style={{ color: "#ef4444", background: "#fee2e2", padding: "10px", borderRadius: "6px", marginBottom: "20px", textAlign: "center", fontSize: "0.9rem" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Full Name</label>
            <div style={{ position: "relative" }}>
              <UserIcon size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
              <input 
                type="text" 
                placeholder="Your full name"
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "12px 12px 12px 35px", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
              <input 
                type="email" 
                placeholder="your@email.com"
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 12px 12px 35px", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Phone Number</label>
            <div style={{ position: "relative" }}>
              <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
              <input 
                type="tel" 
                placeholder="(555) 123-4567"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "100%", padding: "12px 12px 12px 35px", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
              <input 
                type="password" 
                placeholder="Enter your password"
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "12px 35px", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
              <Eye size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", cursor: "pointer" }} />
            </div>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
              <input 
                type="password" 
                placeholder="Confirm your password"
                required 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: "100%", padding: "12px 35px", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
            </div>
          </div>

          <button type="submit" style={{ width: "100%", padding: "14px", background: "var(--green)", color: "var(--white)", borderRadius: "8px", fontWeight: 600, fontSize: "1rem" }} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", margin: "25px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }}></div>
          <span style={{ padding: "0 15px", color: "var(--text-light)", fontSize: "0.85rem" }}>Or continue with</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }}></div>
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
          <button 
            type="button" 
            onClick={() => googleLogin()} 
            style={{ flex: 1, padding: "12px", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "8px", fontWeight: 500, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{width: 18, height: 18}}/>
            Google
          </button>
          
          <button 
            type="button" 
            onClick={() => alert("Facebook login requires advanced configuration.")} 
            style={{ flex: 1, padding: "12px", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "8px", fontWeight: 500, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" style={{width: 18, height: 18}}/>
            Facebook
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: "0.95rem" }}>
          <span style={{ color: "var(--text-muted)" }}>Already have an account? </span>
          <Link to="/login" style={{ color: "var(--green)", fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
