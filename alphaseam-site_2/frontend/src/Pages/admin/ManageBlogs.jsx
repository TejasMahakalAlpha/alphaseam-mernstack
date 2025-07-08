// ManageBlogs.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api';
import './admin.css';

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
    api.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
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

    api.post('/api/blogs', blogData, {
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

      <div className="admin-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="admin-item">
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            {blog.image && (
              <img
                src={`http://localhost:5000${blog.image}`}
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
