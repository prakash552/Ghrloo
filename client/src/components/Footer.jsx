// src/components/Footer.jsx
import '../style/Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

 function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Company Info */}
        <div className="footer-section">
          <h2 className="footer-logo">RealEstatePro</h2>
          <p>
            Helping you find the perfect property – from flats and villas to commercial spaces.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@realestatepro.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Sector 15, Noida, NCR</p>
        </div>

        {/* Social Icons */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RealEstatePro. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;