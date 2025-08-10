// models/projectModel.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required.']
    },
    description: {
        type: String,
        required: [true, 'Project description is required.']
    },
    link: {
        type: String,
        default: ''
    },
    tags: {
        type: [String], // An array of strings
        default: []
    },
    imageUrl: {
        type: String,
        required: [true, 'Project image is required.']
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;