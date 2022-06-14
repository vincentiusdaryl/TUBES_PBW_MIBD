import mysql from 'mysql';
import crypto from 'crypto';

// Membuat koneksi ke database
export const pool = mysql.createPool({
    user: 'root',
    password: 'darylk123',
    database: 'ide',
    host: 'localhost',
    connectionLimit: 10
});

// Fungsi untuk hash password (menggunakan fungsi sha256 dan diencode menggunakan base64)
export const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('base64');