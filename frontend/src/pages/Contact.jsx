import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit
    alert("Message sent!");
  };

  return (
    <div style={{ background: "var(--white)", minHeight: "calc(100vh - 150px)" }}>
      {/* Hero Section */}
      <section style={{ background: "var(--green-light)", padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "20px" }}>
          Get in <span style={{ color: "var(--green)" }}>Touch</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          Have questions about our services? Need help with booking an appointment? We're here to help you every step of the way.
        </p>
      </section>

      <div className="container" style={{ padding: "60px 20px" }}>
        {/* Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px", marginBottom: "80px", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", color: "var(--green)" }}>
              <Phone size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Phone</h3>
            <p style={{ fontSize: "0.95rem", marginBottom: "5px", fontWeight: "500" }}>+1 (555) 123-4567</p>
            <p style={{ fontSize: "0.95rem", marginBottom: "10px", fontWeight: "500" }}>+1 (555) 987-6543</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Call us for immediate assistance</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", color: "var(--green)" }}>
              <Mail size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Email</h3>
            <p style={{ fontSize: "0.95rem", marginBottom: "5px", fontWeight: "500" }}>info@clinico.com</p>
            <p style={{ fontSize: "0.95rem", marginBottom: "10px", fontWeight: "500" }}>support@clinico.com</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Send us an email anytime</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", color: "var(--green)" }}>
              <MapPin size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Address</h3>
            <p style={{ fontSize: "0.95rem", marginBottom: "5px", fontWeight: "500" }}>123 Medical Center Drive</p>
            <p style={{ fontSize: "0.95rem", marginBottom: "10px", fontWeight: "500" }}>Healthcare District, HC 12345</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Visit our main office</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", color: "var(--green)" }}>
              <Clock size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Hours</h3>
            <p style={{ fontSize: "0.95rem", marginBottom: "5px", fontWeight: "500" }}>Mon-Fri: 8:00 AM - 8:00 PM</p>
            <p style={{ fontSize: "0.95rem", marginBottom: "10px", fontWeight: "500" }}>Sat-Sun: 9:00 AM - 5:00 PM</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Our operating hours</p>
          </div>
        </div>

        {/* Contact Form and Side Info */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px", marginBottom: "80px" }}>
          
          {/* Form */}
          <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "40px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "25px" }}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}>Full Name *</label>
                  <input type="text" name="name" placeholder="Your full name" required value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}>Email Address *</label>
                  <input type="email" name="email" placeholder="your@email.com" required value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}>Phone Number</label>
                  <input type="tel" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}>Subject *</label>
                  <select name="subject" required value={formData.subject} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--white)" }}>
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="billing">Billing Question</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}>Message *</label>
                <textarea name="message" rows="5" placeholder="Tell us how we can help you..." required value={formData.message} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", resize: "vertical" }}></textarea>
              </div>

              <button type="submit" style={{ width: "100%", padding: "14px", background: "var(--green)", color: "var(--white)", borderRadius: "8px", fontWeight: "600", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Side Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "40px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Visit Our Office</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "20px", lineHeight: "1.6" }}>
                Our main office is conveniently located in the heart of the medical district. We welcome walk-ins during business hours, though appointments are recommended.
              </p>
              <div style={{ background: "#e2e8f0", height: "200px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                Interactive Map Placeholder
              </div>
            </div>

            <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "40px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Emergency Contact</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "20px", lineHeight: "1.6" }}>
                For medical emergencies, please call 911 immediately. For urgent but non-emergency medical questions, you can reach our on-call service:
              </p>
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "15px" }}>
                <p style={{ color: "#b91c1c", fontWeight: "600", marginBottom: "5px" }}>Emergency Hotline: +1 (555) 911-HELP</p>
                <p style={{ color: "#dc2626", fontSize: "0.85rem" }}>Available 24/7 for urgent medical concerns</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Frequently Asked Questions</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>Quick answers to common questions</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
            <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "25px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>How do I book an appointment?</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                You can book an appointment by browsing our doctors, selecting your preferred physician, and choosing an available time slot that works for you.
              </p>
            </div>
            
            <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "25px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>Can I cancel or reschedule my appointment?</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                Yes, you can cancel or reschedule your appointment up to 24 hours before your scheduled time through your patient portal or by calling our support team.
              </p>
            </div>

            <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "25px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>Do you accept insurance?</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                We work with most major insurance providers. Please contact us with your insurance information to verify coverage before your appointment.
              </p>
            </div>

            <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "25px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>What should I bring to my appointment?</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                Please bring a valid ID, your insurance card, a list of current medications, and any relevant medical records or test results.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
