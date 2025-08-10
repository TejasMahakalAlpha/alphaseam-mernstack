// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

// --- Multer Storage Configuration ---
// This tells Multer where and how to save uploaded files.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        // Create a unique filename to avoid conflicts
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// --- Multer File Filter ---
// This ensures only image files are uploaded.
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: Only image files are allowed!'));
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
    fileFilter: fileFilter
});


// --- API Routes ---
// GET all projects
router.get('/', getProjects);

// POST a new project (with image upload)
router.post('/', upload.single('image'), createProject);

// PUT (update) a project by ID (with optional new image upload)
router.put('/:id', upload.single('image'), updateProject);

// DELETE a project by ID
router.delete('/:id', deleteProject);

module.exports = router;