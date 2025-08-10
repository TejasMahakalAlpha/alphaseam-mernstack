import React, { useEffect, useState } from 'react';
import './Blog.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import axios from 'axios'; // Use axios directly
import { FaArrowRight } from 'react-icons/fa';

// Use the correct API_BASE_URL from your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const newsletterLink = "https://www.linkedin.com/newsletters/alphaseam-sap-services-7341412789007069189";

  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });

    // Use axios with the full URL
    axios.get(`${API_BASE_URL}/api/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  // Safety check: ensure blogs is an array before using slice
  const featuredBlog = Array.isArray(blogs) && blogs.length > 0 ? blogs[0] : null;
  const otherBlogs = Array.isArray(blogs) && blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <div className="blog-page">
      <Helmet>
        <title>Tech Insights | Alphaseam Blog</title>
        <meta name="description" content="Expert analysis and insights on enterprise technology, SAP, and digital transformation from the Alphaseam team." />
      </Helmet>

      <div className="blog-hero-section" data-aos="fade-in">
        <h1>Alphaseam Insights</h1>
        <p>Your source for expert analysis on enterprise technology, digital transformation, and the future of SAP.</p>
      </div>

      <main className="blog-content-wrapper">
        {/* Featured Blog Post */}
        {featuredBlog && (
          <section className="featured-post-section" data-aos="fade-up">
            <h2 className="section-title">Featured Article</h2>
            <div className="featured-card">
              {featuredBlog.image && (
                <div className="featured-image-wrapper">
                  {/* Use the correct API_BASE_URL for images */}
                   <img src={`${API_BASE_URL}${featuredBlog.image}`} alt={featuredBlog.title} className="featured-image" />
                </div>
              )}
              <div className="featured-content">
                <span className="featured-date">{new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <h3>{featuredBlog.title}</h3>
                <p>{featuredBlog.content?.slice(0, 200)}...</p>
                <a href="#" className="read-more-link">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Other Blog Posts */}
        <section className="latest-articles-section">
          <h2 className="section-title" data-aos="fade-up">Latest Articles</h2>
          {otherBlogs.length > 0 ? (
            <div className="blog-grid">
              {otherBlogs.map((blog, index) => (
                <div key={blog._id} className="blog-card" data-aos="fade-up" data-aos-delay={100 + index * 100}>
                  {blog.image && (
                     <img src={`${API_BASE_URL}${blog.image}`} alt={blog.title} className="blog-card-image" />
                  )}
                  <div className="blog-card-content">
                    <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <h4>{blog.title}</h4>
                    <p>{blog.content?.slice(0, 100)}...</p>
                    <a href="#" className="read-more-link">
                      Read More <FaArrowRight />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !featuredBlog && <p className="no-blogs-message">No blog posts found. Check back soon!</p>
          )}
        </section>

        {/* CTA Section */}
        <section className="blog-cta-section" data-aos="zoom-in">
            <h3>Stay Ahead of the Curve</h3>
            <p>Subscribe to our exclusive SAP and tech insights newsletter on LinkedIn.</p>
            <a href={newsletterLink} target="_blank" rel="noopener noreferrer" className="glowing-btn large">
              Subscribe on LinkedIn
            </a>
        </section>
      </main>
    </div>
  );
};

export default Blog;