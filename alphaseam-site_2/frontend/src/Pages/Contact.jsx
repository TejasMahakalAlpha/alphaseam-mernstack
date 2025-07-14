import React, { useState } from 'react';
import './Contact.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import api from '../api'; // Ensure this points to your configured Axios instance

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.subject,
        message: formData.message
      };

      await api.post('/api/contacts', payload);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="contact-video-section">
        <div className="contact-overlay"></div>
        <h1 className="contact-heading">Contact Us</h1>
      </section>

      {/* Contact Info & Form */}
      <div className="contact-container fade-in">
        <h1 className="title">Get In Touch</h1>
        <div className="contact-wrapper">
          {/* Contact Details */}
          <div className="contact-details">
            <h2>Contact Details</h2>
            <p>
              We would love to connect with you! Please fill out the form below or email us at
              <a href="mailto:info@alphaseam.com"> info@alphaseam.com</a>.
            </p>
            <ul>
              <li>🏠 ALPHASEAM, Pune</li>
              <li>📱 +91-9876543210</li>
              <li>📧 info@alphaseam.com</li>
            </ul>
            <div className="social-icons">
              <a href="https://facebook.com" className="icon"><FaFacebookF /></a>
              <a href="https://twitter.com" className="icon"><FaTwitter /></a>
              <a href="https://linkedin.com" className="icon"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="fade-in-up"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="fade-in-up"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="fade-in-up"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="fade-in-up"
              required
            />
            <button className="submit-button fade-in-up" onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* Google Map Updated */}
      <div className="map-container fade-in-up">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5042755279146!2d73.71548897465382!3d18.596374866855435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c11ae71d12cf%3A0x5e0b13fd00d2d1bd!2sALPHASEAM!5e0!3m2!1sen!2sin!4v1752488878608!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}

export default Contact;
