import React, { useEffect, useRef } from 'react';
import './Projects.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import mooropan from "../assets/home/mooropan.png";
import exilieen from "../assets/home/exilieen_logo.png";
import srdt from "../assets/home/srdt.png";
import agrimitra from "../assets/home/agrimitra.jpeg"


// --- Updated Project Data with Images ---
const projectsData = [
  
  {
    image: mooropan, // --- Corrected this line ---
    title: "MooRopan",
    description: "An agricultural tech solution designed to optimize crop management and improve yield for farmers.",
    tags: ["React js", "MongoDB", "Express js"]
  },
  {
    image: srdt,
    title: "SRDT",
    description: "A security and data transformation tool ensuring data integrity and protection for enterprise-level applications.",
    tags: ["React", "Java Spring boot", "SQL"]
  },
  {
    image: exilieen,
    title: "Exilieen",
    description: "A comprehensive software suite for managing complex business operations and workflows.",
    tags: ["React js", "Express js", "MongoDB", "Node js"]
  },
  
  {
    image: agrimitra,
    title: "AgriMitra",
    description: "A farmer-centric application providing vital information on weather, market rates, and best farming practices.",
    tags: ["React js", "Express js", "MongoDB", "Node js"]
  },
  {
    image: "https://placehold.co/600x400/0a0a14/9f55ff?text=Crowd+Funding",
    title: "Crowd Funding",
    description: "A robust platform for raising capital through community contributions, featuring secure payment gateways and project tracking.",
    tags: ["React", "Java", "Spring boot", "MySQL", "Rozerpay","postgresql"]
  },
  {
    image: "https://placehold.co/600x400/0a0a14/9f55ff?text=Hotel+CRM",
    title: "Hotel Management CRM",
    description: "A customer relationship management system tailored for the hospitality industry to enhance guest experiences.",
    tags: ["React", "Java Spring boot", "SQL"]
  },
  {
    image: "https://placehold.co/600x400/0a0a14/9f55ff?text=AMSA",
    title: "AMSA",
    description: "An advanced e-commerce and supply chain management application for seamless online retail operations.",
    tags: ["React js", "Express js", "MongoDB", "Node js"]
  }
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

const ProjectCard = ({ project, index }) => {
    const tiltRef = use3DTilt();
    return (
        <div className="project-card-3d" ref={tiltRef} data-aos="fade-up" data-aos-delay={100 * index}>
            <img src={project.image} alt={project.title} className="project-card-image" />
            <div className="project-card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <div className="projects-page">
      <div className="projects-hero-section" data-aos="fade-in">
        <h1>Innovation in Action</h1>
        <p>A glimpse into the innovative solutions and impactful projects we've successfully delivered.</p>
      </div>

      <div className="projects-content-wrapper">
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <section className="projects-cta-section" data-aos="zoom-in">
          <h3>Have a Project in Mind?</h3>
          <p>Let's collaborate to build the next innovative solution for your business. Get in touch with our experts today.</p>
          <Link to="/contact" className="glowing-btn large">
            Start a Project
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Projects;
