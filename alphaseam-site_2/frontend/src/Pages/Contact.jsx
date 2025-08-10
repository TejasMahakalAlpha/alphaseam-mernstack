import React, { useEffect, useState, useRef } from 'react';
import './Contact.css';
import { FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios'; // Use axios directly
import AOS from 'aos';
import 'aos/dist/aos.css';

// Use the correct API_BASE_URL from your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Custom Hook for the 3D Tilt effect (no changes needed)
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
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
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

  // --- Validation Logic (no changes needed) ---
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) {
          error = 'Name is required.';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name can only contain letters and spaces.';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'phone':
        if (!value) {
            error = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(value)) {
            error = 'Phone number must be exactly 10 digits.';
        }
        break;
      case 'message':
        if (!value) {
          error = 'Message is required.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const newErrors = {};
    let formIsValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);

    if (!formIsValid) {
      showNotification('Please fix the errors before submitting.', 'error');
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      // Use axios with the full URL
      await axios.post(`${API_BASE_URL}/api/contacts`, payload);
      showNotification('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Submit error:', error);
      showNotification('Failed to send message.', 'error');
    }
  };

  return (
    <div className="contact-page">
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

          <div className="contact-form-card" ref={contactFormRef} data-aos="fade-left">
            <form onSubmit={handleSubmit} className="contact-form-content" noValidate>
              <div className="input-wrapper">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="input-wrapper">
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="input-wrapper">
                <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              <div className="input-wrapper">
                <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} className={errors.message ? 'error' : ''} />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              <button type="submit" className="glowing-btn large">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <div className="map-section" data-aos="fade-up" data-aos-delay="300">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.121321034423!2d73.73812161489344!3d18.58989548738089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc900000001%3A0x1c21e360cf3a2e3!2sHinjawadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628860353921!5m2!1sen!2sin"
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