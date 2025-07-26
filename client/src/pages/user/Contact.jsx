// src/pages/Contact.jsx
import '../../style/Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We’re here to help you with all your property needs.</p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="contact-container">
        {/* Left Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have any questions about properties or want to inquire about a listing? 
            Fill out the form or use our contact details below.
          </p>
          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <span>Sector 15, Noida, NCR</span>
          </div>
          <div className="info-box">
            <FaPhoneAlt className="icon" />
            <span>+91 98765 43210</span>
          </div>
          <div className="info-box">
            <FaEnvelope className="icon" />
            <span>info@realestatepro.com</span>
          </div>
        </div>

        {/* Right Form */}
        <form className="contact-form">
          <h2>Send us a message</h2>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="tel" placeholder="Your Phone" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
    </div>
  );
}
