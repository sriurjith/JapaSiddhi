import dotenv from 'dotenv';

dotenv.config();

const environment = {
  PORT: process.env.PORT || 5000,

  NODE_ENV:
    process.env.NODE_ENV || 'development',

  JWT_SECRET:
    process.env.JWT_SECRET || '',

  DB_HOST:
    process.env.DB_HOST || 'localhost',

  DB_PORT: Number(
    process.env.DB_PORT || 3306,
  ),

  DB_NAME:
    process.env.DB_NAME || '',

  DB_USER:
    process.env.DB_USER || '',

  DB_PASSWORD:
    process.env.DB_PASSWORD || '',

  FIREBASE_PROJECT_ID:
    process.env.FIREBASE_PROJECT_ID || '',

  UPLOAD_PATH:
    process.env.UPLOAD_PATH || 'uploads',
};

export default environment;