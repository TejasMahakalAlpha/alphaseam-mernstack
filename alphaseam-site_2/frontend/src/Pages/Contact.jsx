import React, { useState } from 'react';
import './Contact.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import api from '../api'; // ✅ make sure path is correct

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
      // Combine subject and message into one if your backend only stores 'message'
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.subject, // assuming subject is used as phone (you can rename this)
        message: formData.message
      };

      const res = await api.post('/api/contacts', payload);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <>
      {/* Background video section with title */}
      <section className="contact-video-section">
        <div className="contact-overlay"></div>
        <h1 className="contact-heading">Contact Us</h1>
      </section>

      {/* Contact content */}
      <div className="contact-container fade-in">
        <h1 className="title">Get In Touch</h1>
        <div className="contact-wrapper">
          <div className="contact-details">
            <h2>Contact Details</h2>
            <p>
              We would love to connect with you! Please fill out the form below or email us directly at
              <a href="mailto:info@alphaseam.com"> info@alphaseam.com</a> to get in touch.
            </p>
            <ul>
              <li>🏠 601 Gera's Imperium Rise, Hinjewadi Phase 2</li>
              <li>📱 +91-, +91-*</li>
              <li>📧 info@alphaseam.com</li>
            </ul>
            <div className="social-icons">
              <a href="https://facebook.com" className="icon"><FaFacebookF /></a>
              <a href="https://twitter.com" className="icon"><FaTwitter /></a>
              <a href="https://linkedin.com" className="icon"><FaLinkedinIn /></a>
            </div>
          </div>

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
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="fade-in-up"
              required
            ></textarea>
            <button className="submit-button fade-in-up" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="map-container fade-in-up">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!..."
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}

export default Contact;
