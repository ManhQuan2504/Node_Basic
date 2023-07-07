// get the client
// const mysql = require('mysql2');
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_bandoanvat'
});

export default connection;