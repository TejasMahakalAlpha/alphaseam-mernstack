import React, { useEffect, useState } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import api from '../api'; // ✅ adjust if path is different
// You must have: VITE_BACKEND_URL=http://localhost:5000 or your server URL in .env

const stats = [
  { icon: "⏰", value: 5, label: "Happy Clients" },
  { icon: "🔄", value: 4, label: "Projects completed" },
  { icon: "✏", value: 4, label: "Positive feedback" },
  { icon: "⚡", value: 450, label: "Hours Of Support" },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const consultationLink = "https://calendly.com/alphaseam-operations/30min";

  useEffect(() => {
    api.get('/api/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  return (
    <>
      {/* Background Video Section */}
      <section className="services-video-section">
        <div className="services-overlay"></div>
        <div className="services-heading-content">
          <h1 className="services-main-heading">Our Services</h1>
        </div>
      </section>

      {/* Services Description Section */}
      <section className="services">
        <p className="description">
          Empowered by exceptional talent, Alphaseam Pvt Ltd elevates your digital
          landscape by converging innovation and technology to craft bespoke software
          solutions that drive business success.
        </p>

        <div className="grid">
          {services.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>No services available.</p>
          ) : (
            services.map((service) => (
              <div className="box" key={service._id}>
                <div className="icon">{service.icon || "🛠️"}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="skills-header">
          <h2>Our Skills</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat, vel veniam, eos et delectus eveniet molestiae. Esse, voluptas ratione.</p>
          <hr />
        </div>

        <div className="skills-content">
          <div className="left">
            <h3>Custom Software Development</h3>
            <p>
              Alphaseam custom software development empowers businesses to thrive by optimizing
              processes, increasing efficiency, and enhancing decision-making capabilities,
              delivering high-quality solutions quickly and efficiently to meet your unique needs.
            </p>
            <div className="cta-buttons">
              <Link to="/Contact" className="btn primary">Contact Us</Link>
            </div>
          </div>

          <div className="right">
            <div className="skill-bar"><span>DBMS</span><div className="bar"><div className="progress dbms"></div></div></div>
            <div className="skill-bar"><span>Web Application</span><div className="bar"><div className="progress web"></div></div></div>
            <div className="skill-bar"><span>Android Application</span><div className="bar"><div className="progress android"></div></div></div>
            <div className="skill-bar"><span>iOS Development</span><div className="bar"><div className="progress ios"></div></div></div>
          </div>
        </div>
      </section>

      {/* About Stats Section */}
      <section className="about">
        <div className="about-text">
          <h2>About Our Company.</h2>
          <p>
            Alphaseam Pvt Ltd is a global leader in software development, dedicated to
            empowering businesses worldwide with cutting-edge technological solutions.
            Founded in 2019, we have consistently delivered exceptional apps that drive
            business growth and success.
          </p>
        </div>

        <div className="about-stats">
          {stats.map((stat, index) => (
            <div className="stat-box" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free Consultation Button Section */}
      <section className="consultation-cta-section">
        <div className="consultation-content">
          <h2>Ready to transform your business?</h2>
          <p>Book a free consultation with our experts to discuss your project and discover how we can help.</p>
          <a href={consultationLink} target="_blank" rel="noopener noreferrer" className="btn primary consultation-btn">
            Book Free Consultation
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
