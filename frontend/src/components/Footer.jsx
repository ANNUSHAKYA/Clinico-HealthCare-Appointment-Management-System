import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">C</div>
              Clinico
            </Link>
            <p style={{ color: "var(--text-light)", marginBottom: "20px" }}>
              Your trusted healthcare partner providing quality medical services.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/appointments">Appointments</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="#">Cardiology</Link></li>
              <li><Link to="#">Dermatology</Link></li>
              <li><Link to="#">Pediatrics</Link></li>
              <li><Link to="#">Orthopedics</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <div>
                <Phone size={18} color="var(--green)" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div>
                <Mail size={18} color="var(--green)" />
                <span>info@clinico.com</span>
              </div>
              <div>
                <MapPin size={18} color="var(--green)" />
                <span>123 Medical Center Dr</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Clinico. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
