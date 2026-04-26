import { Link } from "react-router-dom";
import { Target, Eye, Heart, Shield, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div style={{ background: "var(--white)", minHeight: "calc(100vh - 150px)" }}>
      {/* Hero Section */}
      <section style={{ background: "var(--green-light)", padding: "80px 20px" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "50px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "20px" }}>
              About <span style={{ color: "var(--green)" }}>Clinico</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "40px", lineHeight: "1.6" }}>
              We're revolutionizing healthcare by making it more accessible, convenient, and patient-centered. Our mission is to connect patients with the right healthcare professionals at the right time.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", textAlign: "center" }}>
              <div>
                <h3 style={{ fontSize: "2rem", color: "var(--green)", marginBottom: "5px" }}>500+</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Happy Patients</p>
              </div>
              <div>
                <h3 style={{ fontSize: "2rem", color: "var(--green)", marginBottom: "5px" }}>50+</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Expert Doctors</p>
              </div>
              <div>
                <h3 style={{ fontSize: "2rem", color: "var(--green)", marginBottom: "5px" }}>10+</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Specialties</p>
              </div>
              <div>
                <h3 style={{ fontSize: "2rem", color: "var(--green)", marginBottom: "5px" }}>24/7</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Support Available</p>
              </div>
            </div>
          </div>
          
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80" 
              alt="About Clinico" 
              style={{ width: "100%", maxWidth: "500px", borderRadius: "var(--radius)", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", objectFit: "cover", height: "400px" }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section style={{ padding: "80px 20px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "50px" }}>
          <div>
            <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", color: "var(--green)" }}>
              <Target size={28} />
            </div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Our Mission</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6" }}>
              To democratize healthcare by providing a seamless platform that connects patients with qualified healthcare professionals, making quality medical care accessible to everyone, everywhere.
            </p>
          </div>
          
          <div>
            <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", color: "var(--green)" }}>
              <Eye size={28} />
            </div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Our Vision</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6" }}>
              To become the world's most trusted healthcare platform, where technology and human care converge to create better health outcomes for individuals and communities globally.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section style={{ background: "#f8fafc", padding: "80px 20px", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>Our Values</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "50px", fontSize: "1.1rem" }}>These core values guide everything we do and shape our commitment to you.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "30px", textAlign: "left" }}>
            <div style={{ background: "var(--white)", padding: "40px 20px", borderRadius: "var(--radius)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "var(--green)" }}>
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Compassionate Care</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>We treat every patient with empathy, respect, and genuine concern for their wellbeing.</p>
            </div>

            <div style={{ background: "var(--white)", padding: "40px 20px", borderRadius: "var(--radius)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "var(--green)" }}>
                <Shield size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Trust & Safety</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>Your health information is secure with us. We maintain the highest standards of privacy and security.</p>
            </div>

            <div style={{ background: "var(--white)", padding: "40px 20px", borderRadius: "var(--radius)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "var(--green)" }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Expert Team</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>Our network includes only qualified, experienced healthcare professionals committed to excellence.</p>
            </div>

            <div style={{ background: "var(--white)", padding: "40px 20px", borderRadius: "var(--radius)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <div style={{ width: "60px", height: "60px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "var(--green)" }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Quality Excellence</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>We continuously strive to improve our services and maintain the highest quality of care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>Our Story</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "1.1rem" }}>How we started and where we're going</p>
          
          <div style={{ textAlign: "left", color: "var(--text)", fontSize: "1.05rem", lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "20px" }}>
            <p>
              Clinico was founded in 2020 with a simple yet powerful vision: to make healthcare more accessible and convenient for everyone. Our founders, having experienced firsthand the challenges of finding and booking appointments with healthcare providers, set out to create a solution that would benefit both patients and doctors.
            </p>
            <p>
              What started as a small team of passionate individuals has grown into a comprehensive healthcare platform serving thousands of patients and hundreds of healthcare professionals. We've built partnerships with leading medical institutions and continue to expand our network of qualified doctors.
            </p>
            <p>
              Today, Clinico stands as a testament to the power of technology in improving healthcare delivery. We're not just a booking platform - we're your healthcare partner, committed to supporting you on your journey to better health.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: "var(--green)", padding: "60px 20px", textAlign: "center", color: "var(--white)" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.2rem", marginBottom: "15px", color: "var(--white)" }}>Join Our Healthcare Community</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "30px", opacity: 0.9, maxWidth: "600px", margin: "0 auto 30px" }}>
            Experience the future of healthcare with Clinico. Book your first appointment today.
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <Link to="/doctors" style={{ background: "var(--white)", color: "var(--green)", padding: "12px 25px", borderRadius: "8px", fontWeight: "600", textDecoration: "none" }}>
              Find a Doctor
            </Link>
            <Link to="/contact" style={{ background: "transparent", color: "var(--white)", border: "2px solid var(--white)", padding: "12px 25px", borderRadius: "8px", fontWeight: "600", textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
