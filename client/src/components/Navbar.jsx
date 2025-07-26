import { Link, NavLink, useLocation } from 'react-router-dom';
import '../style/Navbar.css';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();  // Current route

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we are on Home page
  const isHome = location.pathname === '/';

  return (
    <nav className={`main-navbar ${isHome && !isScrolled ? 'transparent' : 'scrolled'}`}>
      <div className="nav-logo">
        <Link to="/">🏡 PrimePropertyHub</Link>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/properties" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>Properties</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>Contact</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? 'active-link login-btn' : 'login-btn'} onClick={toggleMenu}>Admin Login</NavLink>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
