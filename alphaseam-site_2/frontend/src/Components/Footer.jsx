import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {

  React.useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <footer className="footer-v2" data-aos="fade-up">
      <div className="footer-content-v2">
        <div className="footer-column about-us">
          <h3 className="footer-title">Alphaseam Enterprises</h3>
          <p>Innovating with precision, we deliver cutting-edge SAP and digital solutions to accelerate your business transformation.</p>
          <div className="footer-socials-v2">
            <a href="https://www.linkedin.com/company/alphaseam-enterprises-llp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="footer-column quick-links">
          <h4 className="footer-subtitle">Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/career">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column contact-info">
          <h4 className="footer-subtitle">Contact Us</h4>
          <a href="mailto:info@alphaseam.com" className="contact-item">
            <FaEnvelope />
            <span>info@alphaseam.com</span>
          </a>
          <a href="tel:+917387182811" className="contact-item">
            <FaPhoneAlt />
            <span>+91 7387182811</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom-v2">
        <p>&copy; {new Date().getFullYear()} Alphaseam Enterprises Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
