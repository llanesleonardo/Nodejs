const dotenv = require('dotenv');
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
};

module.exports = { config };
