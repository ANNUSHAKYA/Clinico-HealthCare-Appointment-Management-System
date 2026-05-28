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
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      background: "#fafafa",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {apt.doctor?.image && (
                        <img
                          src={apt.doctor.image}
                          alt={doctorName}
                          style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                        />
                      )}
                      <div>
                        <h3 style={{ fontSize: "1.05rem", marginBottom: "3px" }}>Dr. {doctorName}</h3>
                        {specialty && (
                          <p style={{ color: "var(--green)", fontSize: "0.85rem", fontWeight: 500, marginBottom: "3px" }}>
                            {specialty}
                          </p>
                        )}
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                          📅 {apt.date ? new Date(apt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}&nbsp;&nbsp;
                          🕐 {apt.time || "—"}
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "5px 14px",
                        borderRadius: "20px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        background: statusColor.bg,
                        color: statusColor.text,
                        flexShrink: 0,
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
