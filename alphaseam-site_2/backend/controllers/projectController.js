// controllers/projectController.js

const Project = require('../models/projectModel');
const fs = require('fs'); // Node.js File System module to delete files
const path = require('path');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 }); // Newest first
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
    const { title, description, link, tags } = req.body;

    // Validation
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'Project image is required.' });
    }

    try {
        // Frontend sends tags as a comma-separated string, convert it to an array
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
        
        // Construct the image URL path to be stored in the DB
        const imageUrl = `/uploads/${req.file.filename}`;

        const newProject = new Project({
            title,
            description,
            link,
            tags: tagsArray,
            imageUrl: imageUrl,
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update an existing project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, link, tags } = req.body;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Update fields
        project.title = title || project.title;
        project.description = description || project.description;
        project.link = link || project.link;
        if (tags) {
            project.tags = tags.split(',').map(tag => tag.trim());
        }

        // If a new image is uploaded, update it and delete the old one
        if (req.file) {
            // Delete old image from server
            const oldImagePath = path.join(__dirname, '..', project.imageUrl);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            // Set new image URL
            project.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedProject = await project.save();
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Delete the image file from the 'uploads' folder
        const imagePath = path.join(__dirname, '..', project.imageUrl);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Project.findByIdAndDelete(id);

        res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};