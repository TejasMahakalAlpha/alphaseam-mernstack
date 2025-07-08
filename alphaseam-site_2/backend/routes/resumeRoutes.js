const express = require('express');
const multer = require('multer');
const path = require('path');
const { submitResume, getAllResumes } = require('../controllers/resumeController');

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('resume'), submitResume);      // POST: Submit resume
router.get('/', getAllResumes);                               // GET: Admin fetch all resumes

module.exports = router;
