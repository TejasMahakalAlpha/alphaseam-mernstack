import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logoWhite from '../assets/Navbar/logowhite.png';
import logoBlack from '../assets/Navbar/logoblack.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const headerClasses = `header-v2 ${scrolled || !isHomePage ? 'scrolled' : ''}`;
  const logoToShow = scrolled || !isHomePage ? logoBlack : logoWhite;

  return (
    <header className={headerClasses}>
      <div className="header-container-v2">
        <Link to="/" className="logo-link-v2">
          <img src={logoToShow} alt="Alphaseam Logo" className="logo-img-v2" />
        </Link>

        <nav className={`nav-links-v2 ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/career">Career</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact" className="contact-link-btn">Contact</NavLink>
        </nav>

        <div className="menu-toggle-v2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;
