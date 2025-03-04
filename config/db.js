const mariadb = require('mariadb');
const dotenv = require('dotenv').config();

const db = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10
    });

 module.exports = db