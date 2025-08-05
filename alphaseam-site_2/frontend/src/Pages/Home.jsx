import React, { useEffect, useRef } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

// Assuming asset paths are correct
import heroVideo from "../assets/home/bg9_video.mp4";
import service1 from "../assets/home/sap2.webp";
import service2 from "../assets/home/c-s-d.jpeg";
import service3 from "../assets/home/s-i-s.jpeg";
import aboutImg from "../assets/home/home4.jpg";
import industry1 from "../assets/home/home5.jpg";
import industry2 from "../assets/home/home6.jpg";
import industry3 from "../assets/home/home7.jpg";
import industry4 from "../assets/home/home8.jpg";
import case1 from "../assets/home/home9.jpg";
import case2 from "../assets/home/home10.jpg";
import case3 from "../assets/home/home11.jpg";

const services = [
  {
    img: service1,
    title: "SAP ERP Solutions",
    desc: "Scale your operations with robust, enterprise-grade ERP implementations.",
  },
  {
    img: service2,
    title: "Custom Software Development",
    desc: "Crafting intelligent applications tailored to your unique needs.",
  },
  {
    img: service3,
    title: "System Integration & Consulting",
    desc: "Synchronizing systems for optimized performance and agility.",
  },
];

const industries = [
  { img: industry1, title: "Retail & eCommerce" },
  { img: industry2, title: "Manufacturing" },
  { img: industry3, title: "Banking & Finance" },
  { img: industry4, title: "Logistics & Transportation" },
];

const caseStudies = [
  {
    img: case1,
    title: "Global Retailer",
    desc: "Implemented SAP S/4HANA transformation across 25+ countries.",
  },
  {
    img: case2,
    title: "FinTech Platform",
    desc: "Built scalable API-driven architecture with 99.9% uptime.",
  },
  {
    img: case3,
    title: "Unitary Logistics",
    desc: "Orchestrated system integration across 10+ warehouses.",
  },
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

      const rotateX = (y / height - 0.5) * -25; // Invert and increase intensity
      const rotateY = (x / width - 0.5) * 25;  // Increase intensity

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


const Home = () => {
  const navigate = useNavigate();
  const consultationLink = "https://calendly.com/alphaseam-operations/30min";

  // Refs for each card to apply the 3D tilt effect
  const serviceCardRefs = services.map(() => use3DTilt());
  const industryCardRefs = industries.map(() => use3DTilt());
  const caseCardRefs = caseStudies.map(() => use3DTilt());

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  return (
    <>
      <section className="hero-section">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content" data-aos="fade-down">
          <h1>Delivering Digital Velocity</h1>
          <p>Digital Transformation through modern web & mobile app development</p>
          <button
            className="hero-btn"
            onClick={() => navigate("/contact")}
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </section>

      <section className="services-section" data-aos="fade-up">
        <h2>Our Expertise</h2>
        <div className="services-grid">
          {services.map(({ img, title, desc }, i) => (
            <div key={i} ref={serviceCardRefs[i]} className="service-card" data-aos="zoom-in-up" data-aos-delay={i * 100}>
                <div className="service-card-content">
                    <img src={img} alt={title} />
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" data-aos="fade-up">
        <div className="about-content">
          <div className="about-text" data-aos="fade-right" data-aos-delay="200">
            <h2>Who Are We?</h2>
            <p>
              We are a global team of SAP & digital experts dedicated to accelerating your business
              transformation with agile processes and innovative technology.
            </p>
            <button className="about-btn" onClick={() => navigate("/about")}>
                Know More
            </button>
          </div>
          <div className="about-image" data-aos="fade-left" data-aos-delay="200">
            <img src={aboutImg} alt="Who we are" />
          </div>
        </div>
      </section>

      <section className="industries-section" data-aos="fade-up">
        <h2>Industries We Serve</h2>
        <div className="industries-grid">
          {industries.map(({ img, title }, i) => (
            <div key={i} ref={industryCardRefs[i]} className="industry-card" data-aos="fade-up" data-aos-delay={i * 150}>
               <div className="industry-card-content">
                    <img src={img} alt={title} />
                    <p>{title}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="case-studies-section" data-aos="fade-up">
        <h2>Case Studies</h2>
        <div className="case-studies-grid">
          {caseStudies.map(({ img, title, desc }, i) => (
            <div key={i} ref={caseCardRefs[i]} className="case-card" data-aos="zoom-in" data-aos-delay={i * 100}>
              <img src={img} alt={title} />
              <div className="case-card-content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Added Consultation CTA Section --- */}
      <section className="consultation-cta-section">
        <div className="consultation-content" data-aos="zoom-in">
          <h2>Ready to Transform Your Business?</h2>
          <p>Book a free consultation with our experts to discuss your project and discover how we can help build your future.</p>
          <a href={consultationLink} target="_blank" rel="noopener noreferrer" className="glowing-btn large">
            Book Free Consultation
          </a>
        </div>
      </section>
      {/* --- End of CTA Section --- */}
    </>
  );
};

export default Home;
