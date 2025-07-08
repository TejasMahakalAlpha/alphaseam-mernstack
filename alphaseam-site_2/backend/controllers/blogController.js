// controllers/blogController.js
const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const file = req.file;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const blog = new Blog({
      title,
      content,
      image: file ? `/uploads/blogs/${file.filename}` : null,
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    console.error('❌ Failed to create blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('❌ Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
