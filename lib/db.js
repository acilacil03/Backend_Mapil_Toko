import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Enable SSL rejectUnauthorized false if connecting to Aiven or SSL-required cloud database
if (
  process.env.DB_HOST &&
  (process.env.DB_HOST.includes('aivencloud') || process.env.DB_SSL === 'true')
) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = mysql.createPool(poolConfig);

export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

export default pool;
