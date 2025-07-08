// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adminpanel',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret_key',
  port: process.env.PORT || 5000,
};
