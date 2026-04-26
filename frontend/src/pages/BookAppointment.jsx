import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await API.get(`/doctors/${id}`);
        setDoctor(data.doctor);
      } catch (error) {
        console.error("Error fetching doctor", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooking(true);
    setError("");
    try {
      await API.post("/appointments", { doctorId: id, date, time });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book appointment");
      setBooking(false);
    }
  };

  if (loading) return <div className="spinner" style={{ marginTop: "100px" }}></div>;
  if (!doctor) return <div style={{ textAlign: "center", marginTop: "100px" }}>Doctor not found</div>;

  return (
    <div style={{ padding: "60px 0", background: "var(--green-light)", minHeight: "calc(100vh - 150px)" }}>
      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto", background: "var(--white)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow)" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              <img src={doctor.image} alt={doctor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: "1 1 400px", padding: "40px" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Dr. {doctor.name}</h2>
              <p style={{ color: "var(--green)", fontWeight: 500, fontSize: "1.1rem", marginBottom: "5px" }}>{doctor.specialty}</p>
              <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>{doctor.experience} years of experience</p>

              <form onSubmit={handleSubmit}>
                {error && <div className="error-text">{error}</div>}
                <div className="form-group">
                  <label>Select Date</label>
                  <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label>Select Time</label>
                  <select required value={time} onChange={(e) => setTime(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
                    <option value="">Select a time slot</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "15px" }} disabled={booking}>
                  {booking ? "Booking..." : "Confirm Appointment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
