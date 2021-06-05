import mysql from 'mysql2/promise';

 export const pool = mysql.createPool({
    host: process.env.DATA_BASE_HOST,
    user: process.env.DATA_BASE_USER,
    database: process.env.DATA_BASE_NAME,
    password: process.env.DATA_BASE_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0
  });