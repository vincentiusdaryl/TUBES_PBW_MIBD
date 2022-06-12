import mysql from 'mysql';
import crypto from 'crypto';

export const pool = mysql.createPool({
    user: 'root',
    password: 'darylk123',
    database: 'ide',
    host: 'localhost',
    connectionLimit: 10
});

export const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('base64');