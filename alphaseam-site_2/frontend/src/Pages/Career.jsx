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
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      {/* Notification Toast */}
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

        {/* MODAL FORM */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseForm}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleCloseForm}><FaTimes /></button>
              <h3>Apply for: {selectedJob?.position}</h3>
              <form onSubmit={handleSubmit} className="modal-form">
                <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
                <input type="tel" name="phone" placeholder="Your Phone" required value={formData.phone} onChange={handleChange} />
                <textarea name="message" placeholder="Your Message (Optional)" rows="4" value={formData.message} onChange={handleChange}></textarea>
                <label htmlFor="resume-upload" className="resume-label">
                  {formData.resume ? `📄 ${formData.resume.name}` : 'Upload Your Resume (PDF/DOC)'}
                </label>
                <input id="resume-upload" type="file" name="resume" accept=".pdf,.doc,.docx" required onChange={handleChange} />
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
