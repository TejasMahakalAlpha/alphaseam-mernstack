const Resume = require('../models/Resume');
const nodemailer = require('nodemailer');
const path = require('path');

exports.submitResume = async (req, res) => {
  try {
    const { job, name, email, phone, message } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No resume uploaded' });
    }

    // ✅ Use forward slashes for URL compatibility
    const normalizedPath = `uploads/resumes/${file.filename}`.replace(/\\/g, '/');

    // Save to DB
    const resume = new Resume({
      job,
      name,
      email,
      phone,
      message,
      resumePath: normalizedPath
    });

    await resume.save();

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@alphaseam.com',
      subject: `New Resume Application for ${job}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
      attachments: [
        {
          filename: file.originalname,
          path: path.resolve(__dirname, `../uploads/resumes/${file.filename}`), // Full path for nodemailer
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Resume submitted and email sent.' });
  } catch (error) {
    console.error('❌ Error submitting resume:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('❌ Error fetching resumes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
