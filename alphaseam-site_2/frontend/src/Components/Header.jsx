import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoWhite from '../assets/Navbar/logowhite.png';
import logoBlack from '../assets/Navbar/logoblack.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo-hamburger">
          <Link to="/" className="logo">
            <img
              src={scrolled ? logoBlack : logoWhite}
              alt="Logo"
              className="logo-img"
            />
          </Link>

          <div
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`bar ${scrolled ? 'dark' : ''}`}></span>
            <span className={`bar ${scrolled ? 'dark' : ''}`}></span>
            <span className={`bar ${scrolled ? 'dark' : ''}`}></span>
          </div>
        </div>

        <nav className={`nav-links ${menuOpen ? 'active' : ''} ${scrolled ? 'scrolled-nav' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/career">Career</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
