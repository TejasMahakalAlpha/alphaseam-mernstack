const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  postedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Career', CareerSchema);
