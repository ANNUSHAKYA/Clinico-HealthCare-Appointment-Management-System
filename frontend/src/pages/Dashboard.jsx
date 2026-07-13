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
        <h1 style={{ marginBottom: "10px" }}>Welcome, {user?.name} 👋</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>Manage your healthcare journey</p>

        <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "30px", boxShadow: "var(--shadow)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.5rem" }}>Your Appointments</h2>
            <a href="/doctors" className="btn btn-primary" style={{ fontSize: "0.9rem", padding: "8px 18px" }}>
              + Book New
            </a>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : appointments.length > 0 ? (
            <div style={{ display: "grid", gap: "16px" }}>
              {appointments.map(apt => {
                const status = apt.status || "pending";
                const doctorName = apt.doctor?.name || "Unknown Doctor";
                const specialty  = apt.doctor?.specialty || "";
                const statusColor =
                  status === "confirmed" ? { bg: "var(--green-mid)", text: "var(--green-dark)" } :
                  status === "cancelled" ? { bg: "#fee2e2",          text: "#dc2626"           } :
                                           { bg: "#fef3c7",          text: "#d97706"           };

                return (
                  <div
                    key={apt._id}
                    className="appointment-card"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "24px",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      background: "white",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "default"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      {apt.doctor?.image ? (
                        <img
                          src={apt.doctor.image}
                          alt={doctorName}
                          style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid var(--green-light)" }}
                        />
                      ) : (
                        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green-dark)", fontWeight: "bold", fontSize: "1.2rem" }}>
                          {doctorName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 style={{ fontSize: "1.15rem", marginBottom: "4px", color: "var(--text)" }}>Dr. {doctorName}</h3>
                        {specialty && (
                          <p style={{ color: "var(--green-dark)", fontSize: "0.9rem", fontWeight: 600, marginBottom: "6px" }}>
                            {specialty}
                          </p>
                        )}
                        <div style={{ display: "flex", gap: "12px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            {apt.date ? new Date(apt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            {apt.time || "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "6px 16px",
                        borderRadius: "24px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        background: statusColor.bg,
                        color: statusColor.text,
                        flexShrink: 0,
                        border: `1px solid ${statusColor.text}40`
                      }}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "var(--text-muted)",
                background: "var(--green-light)",
                borderRadius: "var(--radius)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🗓️</div>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "var(--text)" }}>
                No appointments yet
              </p>
              <p style={{ marginBottom: "24px" }}>Book your first appointment with one of our specialists.</p>
              <a href="/doctors" className="btn btn-primary">Find a Doctor</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
