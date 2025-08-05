import React, { useEffect, useState, useRef } from 'react';
import './Career.css';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBriefcase, FaGraduationCap, FaGlobe, FaLightbulb, FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import api from '../api'; // Axios instance

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
        const rotateX = (y / height - 0.5) * -20;
        const rotateY = (x / width - 0.5) * 20;
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

const Career = () => {
  const [careers, setCareers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });

    api.get('/api/careers')
      .then((res) => setCareers(res.data))
      .catch((err) => console.error('Error fetching careers:', err));
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleOpenForm = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setFormData({ name: '', email: '', phone: '', message: '', resume: null });
    setErrors({}); // Clear errors on close
  };

  // --- Validation Logic ---
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Name is required.';
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = 'Name can only contain letters and spaces.';
        break;
      case 'email':
        if (!value) error = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email address.';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required.';
        else if (!/^\d{10}$/.test(value)) error = 'Phone number must be exactly 10 digits.';
        break;
      case 'resume':
        if (!value) error = 'Resume is required.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === 'resume' ? files[0] : value;
    
    setFormData({ ...formData, [name]: fieldValue });

    // Real-time validation
    const error = validateField(name, fieldValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {};
    let formIsValid = true;
    Object.keys(formData).forEach(key => {
      // Message is optional, skip validation if it's empty
      if (key === 'message' && !formData[key]) return;

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

    const data = new FormData();
    data.append('job', selectedJob?.position);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('message', formData.message);
    data.append('resume', formData.resume);

    try {
      await api.post('/api/resume', data);
      showNotification('Application submitted successfully!', 'success');
      handleCloseForm();
    } catch (err) {
      console.error('Submission error:', err);
      showNotification('Failed to submit application. Please try again.', 'error');
    }
  };

  return (
    <div className="career-page">
      <Helmet>
        <title>Career Opportunities at Alphaseam Enterprise</title>
        <meta name="description" content="Explore career openings at Alphaseam Enterprise. Join a dynamic IT company specializing in SAP and ERP technologies." />
      </Helmet>

      {notification.show && (
        <div className={`notification-toast ${notification.type} ${notification.show ? 'show' : ''}`}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
          {notification.message}
        </div>
      )}

      <div className="career-hero-section" data-aos="fade-in">
        <h1>Join Our Team of Innovators</h1>
        <p>We are revolutionizing business technology through cutting-edge SAP & ERP solutions. Be a part of our journey.</p>
      </div>

      <div className="career-content-wrapper">
        <h2 className="section-title" data-aos="fade-up">Current Openings</h2>
        <div className="job-listings">
          {careers.length > 0 ? careers.map((job, index) => (
            <div key={index} className="job-card-3d" ref={use3DTilt()} data-aos="fade-up" data-aos-delay={100 + index * 100}>
              <div className="job-card-content">
                <div className="job-header">
                  <h3 className="job-title">{job.position}</h3>
                  <div className="job-meta">
                    <span className="job-tag">{job.location}</span>
                    <span className="job-tag">{job.experience}</span>
                  </div>
                </div>
                <p className="job-description">{job.description}</p>
                <button className="glowing-btn" onClick={() => handleOpenForm(job)}>
                  Apply Now
                </button>
              </div>
            </div>
          )) : <p className="no-openings">No current openings. Check back soon!</p>}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseForm}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleCloseForm}><FaTimes /></button>
              <h3>Apply for: {selectedJob?.position}</h3>
              <form onSubmit={handleSubmit} className="modal-form" noValidate>
                <div className="input-wrapper">
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="input-wrapper">
                  <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="input-wrapper">
                  <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <div className="input-wrapper">
                  <textarea name="message" placeholder="Your Message (Optional)" rows="4" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="resume-upload" className={`resume-label ${errors.resume ? 'error' : ''}`}>
                    {formData.resume ? `📄 ${formData.resume.name}` : 'Upload Your Resume (PDF/DOC)'}
                  </label>
                  <input id="resume-upload" type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} style={{ display: 'none' }} />
                  {errors.resume && <span className="error-message">{errors.resume}</span>}
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="glowing-btn">Submit Application</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="benefits-section">
          <h2 className="section-title" data-aos="fade-up">Why Work With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="200">
              <FaBriefcase className="icon" />
              <h4>Cutting-Edge Projects</h4>
              <p>Work with the latest SAP technologies for global industry leaders.</p>
            </div>
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="300">
              <FaGraduationCap className="icon" />
              <h4>Professional Growth</h4>
              <p>Continuous learning through real-world challenges and certifications.</p>
            </div>
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="400">
              <FaGlobe className="icon" />
              <h4>Global Team</h4>
              <p>Collaborate with experts across 15+ countries worldwide.</p>
            </div>
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="500">
              <FaLightbulb className="icon" />
              <h4>Culture of Innovation</h4>
              <p>Freedom to try new technologies and build impactful solutions.</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-container" data-aos="zoom-in">
            <h3>Can't find your role?</h3>
            <p>We're always looking for exceptional talent. Feel free to submit your resume for future opportunities!</p>
            <button className="glowing-btn large" onClick={() => handleOpenForm({ position: 'General Application' })}>
              Submit Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
