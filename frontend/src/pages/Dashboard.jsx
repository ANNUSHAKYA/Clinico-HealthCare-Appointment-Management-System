import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await API.get("/appointments");
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "40px 0", minHeight: "calc(100vh - 150px)", background: "var(--green-light)" }}>
      <div className="container">
        <h1 style={{ marginBottom: "10px" }}>Welcome, {user?.name}</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>Manage your healthcare journey</p>

        <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "30px", boxShadow: "var(--shadow)" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Your Appointments</h2>
          
          {loading ? (
            <div className="spinner"></div>
          ) : appointments.length > 0 ? (
            <div style={{ display: "grid", gap: "20px" }}>
              {appointments.map(apt => (
                <div key={apt._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>Dr. {apt.doctor?.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{new Date(apt.date).toLocaleDateString()} at {apt.time}</p>
                  </div>
                  <div>
                    <span style={{ padding: "5px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500, background: apt.status === 'confirmed' ? "var(--green-mid)" : "#fef3c7", color: apt.status === 'confirmed' ? "var(--green-dark)" : "#d97706" }}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", background: "var(--green-light)", borderRadius: "var(--radius)" }}>
              <p>You have no appointments scheduled.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
