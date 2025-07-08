// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/uploadBlogImage');

router.post('/', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);

module.exports = router;
