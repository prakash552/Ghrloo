// src/pages/About.jsx
import '../../style/About.css';
import { FaUsers, FaBuilding, FaHandshake } from 'react-icons/fa';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>About Our Company</h1>
          <p>We help you find the perfect property – flats, plots, villas, and more.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make property hunting simple and transparent. 
            We connect trusted dealers with buyers, ensuring that every step 
            of the process is smooth, reliable, and hassle-free.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stats-card">
          <FaBuilding className="stat-icon" />
          <h3>120+</h3>
          <p>Properties Listed</p>
        </div>
        <div className="stats-card">
          <FaUsers className="stat-icon" />
          <h3>300+</h3>
          <p>Happy Clients</p>
        </div>
        <div className="stats-card">
          <FaHandshake className="stat-icon" />
          <h3>50+</h3>
          <p>Trusted Dealers</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="CEO" />
              <h4>Rakesh Kumar</h4>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Manager" />
              <h4>Priya Sharma</h4>
              <p>Operations Manager</p>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="Sales Head" />
              <h4>Arjun Singh</h4>
              <p>Sales Head</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
