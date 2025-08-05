import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import { Helmet } from 'react-helmet';
import { FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import api from '../api'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

// Custom Hook for the 3D Tilt effect
const use3DTilt = () => {
    const ref = useRef(null);
    useEffect(() => {
      const element = ref.current;
      if (!element) return;
      const handleMouseMove = (e) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = (y / height - 0.5) * -15;
        const rotateY = (x / width - 0.5) * 15;
        element.style.setProperty('--rotateX', `${rotateX}deg`);
        element.style.setProperty('--rotateY', `${rotateY}deg`);
      };
      const handleMouseLeave = () => {
        element.style.setProperty('--rotateX', '0deg');
        element.style.setProperty('--rotateY', '0deg');
      };
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);
    return ref;
};


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Changed from subject to phone for clarity
    message: '',
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const contactFormRef = use3DTilt();

  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Payload remains the same as backend expects 'phone'
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      await api.post('/api/contacts', payload);
      showNotification('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submit error:', error);
      showNotification('Failed to send message.', 'error');
    }
  };

  return (
    <div className="contact-page">
       {/* Notification Toast */}
       {notification.show && (
        <div className={`notification-toast ${notification.type} ${notification.show ? 'show' : ''}`}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
          {notification.message}
        </div>
      )}

      <div className="contact-hero-section" data-aos="fade-in">
        <h1>Get In Touch</h1>
        <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
      </div>

      <div className="contact-content-wrapper">
        <div className="contact-grid">
          {/* Contact Details */}
          <div className="contact-details-card" data-aos="fade-right">
            <h3>Contact Information</h3>
            <p>
              Fill up the form and our team will get back to you within 24 hours.
            </p>
            <ul>
              <li><FaPhoneAlt className="contact-icon" /> <a href="tel:+917387182811">+91-7387182811</a></li>
              <li><FaEnvelope className="contact-icon" /> <a href="mailto:info@alphaseam.com">info@alphaseam.com</a></li>
              <li><FaMapMarkerAlt className="contact-icon" /> <span>City Centre, Hinjawadi, Pune</span></li>
            </ul>
            <div className="social-icons-wrapper">
              <a href="https://www.linkedin.com/company/alphaseam-enterprises-llp/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card" ref={contactFormRef} data-aos="fade-left">
            <form onSubmit={handleSubmit} className="contact-form-content">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
              <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required />
              <button type="submit" className="glowing-btn large">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <div className="map-section" data-aos="fade-up" data-aos-delay="300">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d121008.75162320398!2d73.68082358566583!3d18.59550967191338!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbe7af9b56b1%3A0x7c1c86b796e12483!2sCity%20Centre%20-%20Kolte%20Patil!5e0!3m2!1sen!2sin!4v1754387642034!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
