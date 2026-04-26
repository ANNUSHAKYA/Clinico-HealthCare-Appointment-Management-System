import { Link } from "react-router-dom";
import { Calendar, Users, Clock, Award, Star, ArrowRight } from "lucide-react";

export default function Home() {
  const sampleDoctors = [
    {
      _id: "1",
      name: "Ramesh",
      specialty: "Cardiology",
      experience: 9,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
      rating: 4.8
    },
    {
      _id: "2",
      name: "Raghav Singh",
      specialty: "Neurology",
      experience: 7,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80",
      rating: 4.9
    },
    {
      _id: "3",
      name: "Anjali Singhal",
      specialty: "Psychiatry",
      experience: 8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
      rating: 4.7
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text fade-in">
            <h1>Your Health, Our <br/><span>Priority</span></h1>
            <p>
              Connect with qualified doctors, book appointments easily, and take 
              control of your healthcare journey with Clinico.
            </p>
            <div className="hero-buttons">
              <Link to="/doctors" className="btn btn-primary">Find Doctors</Link>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
          
          <div className="hero-card fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="hero-card-icon">
              <Users size={30} />
            </div>
            <div className="hero-card-text">
              <h3>500+</h3>
              <p>Happy Patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <h2 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>Why Choose Clinico?</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          We're committed to making healthcare accessible, convenient, and reliable for everyone.
        </p>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"><Calendar size={32} /></div>
            <h3>Easy Booking</h3>
            <p>Book appointments with your preferred doctors in just a few clicks</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Users size={32} /></div>
            <h3>Expert Doctors</h3>
            <p>Access to qualified and experienced medical professionals</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Clock size={32} /></div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support for all your healthcare needs</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Award size={32} /></div>
            <h3>Quality Care</h3>
            <p>Committed to providing the highest standard of medical care</p>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <div className="container">
          <h2 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>Meet Our Doctors</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Experienced professionals dedicated to your health
          </p>
          
          <div className="doctors-grid">
            {sampleDoctors.map((doc) => (
              <div key={doc._id} className="doctor-card">
                <img src={doc.image} alt={doc.name} className="doctor-image" />
                <div className="doctor-info">
                  <h3 className="doctor-name">{doc.name}</h3>
                  <p className="doctor-specialty">{doc.specialty}</p>
                  <p className="doctor-exp">{doc.experience} experience</p>
                  <div className="doctor-footer">
                    <div className="doctor-rating">
                      <Star size={18} fill="currentColor" />
                    </div>
                    <Link to={`/book/${doc._id}`} className="book-link">
                      Book Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link to="/doctors" className="btn btn-primary">View All Doctors</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Take Care of Your Health?</h2>
          <p>Join thousands of patients who trust Clinico for their healthcare needs.</p>
          <Link to="/register" className="btn btn-white" style={{ padding: "12px 30px", fontSize: "1.1rem" }}>
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
