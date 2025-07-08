import React, { useEffect, useState } from 'react';
import './Career.css';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBriefcase, FaGraduationCap, FaGlobe, FaLightbulb } from 'react-icons/fa';
import api from '../api'; // Axios instance

const Career = () => {
  const [careers, setCareers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null,
  });

  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });

    api.get('/api/careers')
      .then((res) => setCareers(res.data))
      .catch((err) => console.error('Error fetching careers:', err));
  }, []);

  const handleOpenForm = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseForm = () => {
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      resume: null,
    });
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
      alert('✅ Application submitted successfully!');
      handleCloseForm();
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('❌ Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="career-page">
      <Helmet>
        <title>Career Opportunities at Alphaseam Enterprise</title>
        <meta
          name="description"
          content="Explore career openings at Alphaseam Enterprise. Join a dynamic IT company specializing in SAP and ERP technologies."
        />
      </Helmet>

      <div className="job-listings-container">
        <h1 className="section-title" data-aos="fade-down">
          CAREER OPPORTUNITIES
        </h1>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Join our team of innovators revolutionizing business tech through SAP & ERP.
        </p>

        <div className="job-listings">
          <h3 className="current-openings" data-aos="fade-up">
            Current Openings
          </h3>
          {careers.map((job, index) => (
            <div key={index} className="job-card" data-aos="fade-up" data-aos-delay={100 + index * 100}>
              <div className="job-header">
                <div>
                  <h4 className="job-title">{job.position}</h4>
                  <div className="job-meta">
                    <span className="job-tag">{job.location}</span>
                    <span className="job-tag">{job.experience}</span>
                  </div>
                </div>
                <button className="cta-button" onClick={() => handleOpenForm(job)}>
                  Apply Now
                </button>
              </div>
              <div className="job-description">
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL FORM */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Apply for: {selectedJob?.position}</h3>
              <form onSubmit={handleSubmit} className="modal-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleChange}
                />
                <div className="modal-buttons">
                  <button type="submit" className="cta-button">
                    Submit
                  </button>
                  <button type="button" className="cta-button cancel" onClick={handleCloseForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* BENEFITS SECTION */}
        <div className="benefits-section">
          <h3 className="section-subheader" data-aos="fade-up">
            Why Work With Us?
          </h3>
          <div className="benefits-grid">
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="200">
              <FaBriefcase className="icon" />
              <h4 className="benefit-title">Cutting-Edge Projects</h4>
              <p>Work with the latest SAP technologies for global industry leaders.</p>
            </div>
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="300">
              <FaGraduationCap className="icon" />
              <h4 className="benefit-title">Professional Growth</h4>
              <p>Continuous learning through real-world challenges and certifications.</p>
            </div>
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="400">
              <FaGlobe className="icon" />
              <h4 className="benefit-title">Global Team</h4>
              <p>Collaborate with experts across 15+ countries worldwide.</p>
            </div>
            <div className="benefit-card" data-aos="zoom-in" data-aos-delay="500">
              <FaLightbulb className="icon" />
              <h4 className="benefit-title">Culture of Innovation</h4>
              <p>Freedom to try new technologies and build impactful solutions.</p>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="cta-section">
          <div className="cta-container" data-aos="zoom-in">
            <h3 className="cta-title">Ready to Join Us?</h3>
            <p className="cta-description">
              Can't find your role? We're always looking for exceptional talent. Submit your resume!
            </p>
            <button className="cta-button" onClick={() => handleOpenForm({ position: 'General Application' })}>
              Submit Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
