const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  job: String,
  name: String,
  email: String,
  phone: String,
  message: String,
  resumePath: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);
