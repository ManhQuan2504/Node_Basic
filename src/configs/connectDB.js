// get the client
// const mysql = require('mysql2');
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_bandoanvat'
});

// simple query
// connection.query(
//     'SELECT * FROM `admin`',
//     function (err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         // console.log(fields); // fields contains extra meta data about results, if available
//         console.log(results[0]); // results contains rows returned by server

//     }
// );

// with placeholder
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function (err, results) {
//         console.log(results);
//     }
// );

export default connection;