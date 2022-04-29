const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.MYSQL_ADDRESS,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

console.log("DB LOAD");
module.exports = pool;