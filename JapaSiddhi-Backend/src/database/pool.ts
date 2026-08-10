import mysql from 'mysql2/promise';
import environment from '../config/environment';

const pool = mysql.createPool({
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,

  waitForConnections: true,

  connectionLimit: 20,

  queueLimit: 0,

  enableKeepAlive: true,
});

export default pool;