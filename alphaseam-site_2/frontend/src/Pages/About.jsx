import React, { useEffect, useState, useRef } from 'react';
import './About.css';
import bgVideo from '../assets/about/bg10_video.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaLightbulb,
  FaUsers,
  FaAward,
  FaGlobe,
  FaHandshake,
  FaStar
} from 'react-icons/fa';

// Data for Core Values Section
const coreValues = [
  {
    icon: <FaHandshake />,
    title: "Integrity",
    desc: "We build trust through absolute transparency and unwavering ethical practices in every interaction."
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    desc: "We constantly embrace change, challenge the status quo, and strive to continuously improve our solutions."
  },
  {
    icon: <FaStar />,
    title: "Excellence",
    desc: "We are committed to delivering the highest standards of quality and precision in every single project we undertake."
  },
  {
    icon: <FaUsers />,
    title: "Collaboration",
    desc: "We believe in the power of synergy, working as one unified team, both internally and with our valued clients."
  }
];

// Data for Journey Section
const journeyData = [
  {
    year: "2022",
    title: "Founded in Pune",
    desc: "Established with a clear vision to become a trusted global leader in SAP and ERP solutions."
  },
  {
    year: "2023",
    title: "Global Expansion",
    desc: "Grew rapidly and began serving a diverse clientele across Europe, the Middle East, and Asia."
  },
  {
    year: "2024",
    title: "Team Expansion",
    desc: "Built a world-class, diverse team of certified consultants, expert analysts, and creative developers."
  },
  {
    year: "2025",
    title: "Excellence Delivered",
    desc: "Successfully completed over 50 major enterprise projects with a track record of global delivery and innovation."
  }
];


const About = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <div className="about-page">
      <div className="background-container">
        <video autoPlay muted loop className="background-video">
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="background-overlay"></div>
      </div>

      <div className="about-content">
        <section className="about-hero">
          <h1 data-aos="fade-down">
            About Alphaseam
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            We are a Pune-based IT powerhouse delivering enterprise-grade SAP and ERP solutions to businesses across the globe. Our mission is to fuel digital transformation with cutting-edge technology, reliability, and relentless innovation.
          </p>
        </section>

        <section className="section-intro" data-aos="fade-up" data-aos-delay="300">
          <h2>Who Are We ?</h2>
          <p>
            With a diverse team of developers, consultants, and strategists, Alphaseam combines deep domain knowledge with technical expertise to deliver intelligent and scalable software systems. We are not just a service provider — we are your trusted transformation partner, dedicated to your success.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="core-values-section">
          <h2 data-aos="fade-up">Our Core Values</h2>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div key={index} className="flip-card-container">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-icon">{value.icon}</div>
                    <h3>{value.title}</h3>
                  </div>
                  <div className="flip-card-back">
                    <p>{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Galactic Roadmap Section */}
        <section className="journey-section-v3">
            <h2 data-aos="fade-up">Our Galactic Roadmap</h2>
            <div className="roadmap-container">
                {journeyData.map((item, index) => (
                    <div key={index} className="roadmap-item" data-aos="fade-up">
                        <div className="roadmap-content">
                            <span className="roadmap-year">{item.year}</span>
                            <h3 className="roadmap-title">{item.title}</h3>
                            <p className="roadmap-desc">{item.desc}</p>
                        </div>
                        <div className="roadmap-node-container">
                            <div className="roadmap-node"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="section-intro final-card" data-aos="zoom-in" data-aos-delay="400">
            <h2>Why Choose Alphaseam?</h2>
            <div className="icon-grid">
                <div><FaLightbulb /><span>Innovation First</span></div>
                <div><FaUsers /><span>Client-Centric</span></div>
                <div><FaAward /><span>Certified Expertise</span></div>
                <div><FaGlobe /><span>Global Impact</span></div>
            </div>
            <p className="final-text">
                We don’t just build solutions — we build futures. When you work with us, you’re partnering with passionate professionals who care about your business as much as you do.
            </p>
        </section>
      </div>
    </div>
  );
};

export default About;
