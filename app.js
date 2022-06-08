import mysql from 'mysql';

export const pool = mysql.createPool({
    user: 'root',
    password: '',
    database: 'ide',
    host: 'localhost',
    connectionLimit: 10
});

const PBKDF_ITERATIONS = 10000;
export const hashPassword = (password) => pbkdf2Sync(password, randomBytes(32), PBKDF_ITERATIONS, 10, 'sha512').toString('hex');