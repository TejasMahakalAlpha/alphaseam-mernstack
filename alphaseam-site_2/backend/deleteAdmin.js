// deleteAdmin.js
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const deleteAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Admin.deleteOne({ email: 'tejs.mahakal@gmail.com' });
    console.log('✅ Old admin deleted');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error deleting admin:', err);
  }
};

deleteAdmin();
