import React, { useEffect, useState, useRef } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import api from '../api'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  FaReact, FaNodeJs, FaAws, FaFigma, FaDocker, FaShieldAlt, FaCogs, FaCode, FaLink, FaUsers, FaCloud, FaMobileAlt, FaAndroid
} from 'react-icons/fa';


// Data for the new Hexagon Skills Grid
const skillsData = [
  { icon: <FaCogs />, title: "ERP & SAP", description: "Expertise in SAP S/4HANA, ABAP, FICO, MM, SD, PP Modules." },
  { icon: <FaReact />, title: "Full-Stack Web", description: "React, Node.js, Express, MongoDB, Firebase, REST APIs." },
  { icon: <FaAws />, title: "Cloud Tech", description: "AWS, Azure, and Google Cloud Platform solutions." },
  { icon: <FaAndroid />, title: "Mobile Apps", description: "Android & iOS development using Flutter and React Native." },
  { icon: <FaDocker />, title: "DevOps & CI/CD", description: "Docker, Jenkins, GitHub Actions, and Kubernetes." },
  { icon: <FaFigma />, title: "UI/UX Design", description: "Figma, Adobe XD for responsive, user-friendly interfaces." },
  { icon: <FaShieldAlt />, title: "Cybersecurity", description: "Data protection, secure development, and ISO practices." },
];

const stats = [
  { icon: "😊", value: 7, label: "Happy Clients" },
  { icon: "✨", value: 7, label: "Projects completed" },
  { icon: "👍", value: 10 , label: "Positive feedback" },
  { icon: "⏳", value: 750, label: "Hours Of Support" },
];

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
  
        const rotateX = (y / height - 0.5) * -25;
        const rotateY = (x / width - 0.5) * 25;
  
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

// --- Function to get a default icon based on service title (with added safety check) ---
const getIconForService = (title) => {
    // This check prevents the app from crashing if a service has no title
    const lowerCaseTitle = (title || '').toLowerCase(); 
    if (lowerCaseTitle.includes('sap')) return <FaCogs />;
    if (lowerCaseTitle.includes('software') || lowerCaseTitle.includes('development')) return <FaCode />;
    if (lowerCaseTitle.includes('integration')) return <FaLink />;
    if (lowerCaseTitle.includes('consulting')) return <FaUsers />;
    if (lowerCaseTitle.includes('cloud')) return <FaCloud />;
    if (lowerCaseTitle.includes('mobile') || lowerCaseTitle.includes('app')) return <FaMobileAlt />;
    return "⚙️"; // Generic fallback icon
};

const ServiceCard = ({ service, index }) => {
  const tiltRef = use3DTilt();

  return (
    <div 
      className="service-card-3d" 
      ref={tiltRef}
      data-aos="zoom-in-up"
      data-aos-delay={index * 100}
    >
      <div className="service-card-content">
        <div className="service-icon">{service.icon || getIconForService(service.title)}</div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </div>
  );
};


const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const consultationLink = "https://calendly.com/alphaseam-operations/30min";

  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });
    
    api.get('/api/services')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          console.error('API response is not an array:', res.data);
          setServices([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setServices([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="services-page">
      <div className="services-hero-section" data-aos="fade-in">
        <h1>Our Services</h1>
        <p>
          Empowered by exceptional talent, Alphaseam elevates your digital landscape by converging innovation and technology to craft bespoke software solutions that drive business success.
        </p>
      </div>

      <section className="services-grid-section">
        <div className="services-grid">
          {loading ? (
            <p className="loading-text">Loading Services...</p>
          ) : (
            Array.isArray(services) && services.length > 0 ? (
              services.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
              ))
            ) : (
              <p className="loading-text">No services available at the moment.</p>
            )
          )}
        </div>
      </section>

      {/* Other sections remain unchanged */}
      <section className="skills-section-v2">
        <h2 data-aos="fade-up">Our Technical Skills</h2>
        <div className="skills-hexagon-grid" data-aos="fade-up" data-aos-delay="200">
          {skillsData.map((skill, index) => (
            <div key={index} className="hexagon-wrapper">
              <div className="hexagon">
                <div className="hexagon-icon">{skill.icon}</div>
                <div className="hexagon-title">{skill.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="skills-cta" data-aos="fade-up" data-aos-delay="400">
            <h3>Custom Software Development</h3>
            <p>
              Alphaseam's custom software development empowers businesses to thrive by optimizing processes, increasing efficiency, and enhancing decision-making capabilities, delivering high-quality solutions to meet your unique needs.
            </p>
            <Link to="/contact" className="glowing-btn">Contact Us</Link>
        </div>
      </section>

      <section className="stats-section">
        <h2 data-aos="fade-up">Our Achievements</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index} data-aos="fade-up" data-aos-delay={index * 150}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}{index === 0 ? '+' : ''}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="consultation-cta-section">
        <div className="consultation-content" data-aos="zoom-in">
          <h2>Ready to Transform Your Business?</h2>
          <p>Book a free consultation with our experts to discuss your project and discover how we can help build your future.</p>
          <a href={consultationLink} target="_blank" rel="noopener noreferrer" className="glowing-btn large">
            Book Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
