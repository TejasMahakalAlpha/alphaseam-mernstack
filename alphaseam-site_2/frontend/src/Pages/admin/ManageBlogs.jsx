import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Use axios directly
import './Admin.css';

// Add the API_BASE_URL constant
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    // Add ${API_BASE_URL} to the request
    axios.get(`${API_BASE_URL}/api/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Fetch error:', err));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = new FormData();
    blogData.append('title', formData.title);
    blogData.append('content', formData.content);
    if (formData.image) {
      blogData.append('image', formData.image);
    }
    
    // Add ${API_BASE_URL} to the request
    axios.post(`${API_BASE_URL}/api/blogs`, blogData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        fetchBlogs();
        setFormData({ title: '', content: '', image: null });
      })
      .catch(err => console.error('Save error:', err));
  };

  return (
    <div className="admin-container">
      <h2>Manage Blogs</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          rows="4"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">Add Blog</button>
      </form>

      {/* Blog List */}
      <div className="admin-list">
        {Array.isArray(blogs) && blogs.map((blog) => (
          <div key={blog._id} className="admin-item">
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>

            {blog.image && (
              <img
                // Add ${API_BASE_URL} to the image source
                src={`${API_BASE_URL}${blog.image}`}
                alt="blog-img"
                style={{ width: '100px', height: 'auto', marginTop: '8px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBlogs;