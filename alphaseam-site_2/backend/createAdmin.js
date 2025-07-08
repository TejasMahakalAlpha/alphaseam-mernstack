const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = new Admin({
      email: 'tejs.mahakal@gmail.com',
      password: 'admin123', // ✅ plain text, will be hashed by the schema
    });

    await admin.save();
    console.log('✅ New Admin created with password: admin123');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  }
};

createAdmin();
