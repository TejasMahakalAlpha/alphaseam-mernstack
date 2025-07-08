import React, { useEffect, useState } from 'react';
import './Blog.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import api from '../api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });

    // Fetch blogs from backend
    api.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <div className="blog-page">
      <Helmet>
        <title>Tech Insights | Alphaseam Blog</title>
      </Helmet>

      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="header-content">
          <h1 className="hero-title" data-aos="fade-down">Alphaseam Insights</h1>
          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
            Expert analysis on enterprise technology
          </p>
        </div>
      </div>

      <main className="blog-content">
        <section className="categories-section">
          <h2 className="section-title" data-aos="fade-up">Latest Articles</h2>
          <div className="categories-grid">
            {blogs.length > 0 ? blogs.map((blog, index) => (
              <div
                key={blog._id}
                className="category-card"
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}
              >
                {/* Show image if exists */}
                {blog.image && (
                  <img
                    src={`http://localhost:5000${blog.image}`}
                    alt={blog.title}
                    className="blog-image"
                  />
                )}

                <div className="category-header">
                  <h3>{blog.title}</h3>
                </div>

                <p className="blog-snippet">
                  {blog.content?.slice(0, 150)}...
                </p>

                <div className="blog-meta">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                <button
                  className="view-all-btn"
                  onClick={() => alert('Read more coming soon')}
                >
                  Read More
                </button>
              </div>
            )) : (
              <p>No blog posts found.</p>
            )}
          </div>
        </section>

        <div className="cta-section" data-aos="zoom-in">
          <button
            className="subscribe-btn"
            onClick={() => alert('Subscribe functionality')}
          >
            Subscribe to Updates
          </button>
          <button
            className="write-btn"
            onClick={() => alert('Write for us functionality')}
          >
            Write for Us
          </button>
        </div>
      </main>
    </div>
  );
};

export default Blog;
