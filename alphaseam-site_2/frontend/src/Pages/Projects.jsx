import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Projects.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
    const imageUrl = project.imageUrl ? `${API_BASE_URL}${project.imageUrl}` : "https://placehold.co/600x400/0a0a14/9f55ff?text=Project";

    return (
        <div className="project-card-3d" ref={tiltRef} data-aos="fade-up" data-aos-delay={100 * index}>
            <img src={imageUrl} alt={project.title} className="project-card-image" />
            <div className="project-card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                    {project.tags && project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                {/* The "View Project" button has been removed from here */}
            </div>
        </div>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });

        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/projects`);
                setProjects(response.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Could not load projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="projects-page">
            <div className="projects-hero-section" data-aos="fade-in">
                <h1>Innovation in Action</h1>
                <p>A glimpse into the innovative solutions and impactful projects we've successfully delivered.</p>
            </div>

            <div className="projects-content-wrapper">
                <div className="projects-grid">
                    {loading ? (
                        <p className="loading-message">Loading Projects...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        projects.map((project, index) => (
                            <ProjectCard key={project._id} project={project} index={index} />
                        ))
                    )}
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