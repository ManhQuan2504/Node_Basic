import { json } from 'body-parser';
import connection from '../configs/connectDB';

let getHomePage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `admin`',
        function (err, results, fields) {
            console.log(`result`, results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            data = results.map((row) => {
                return row;
            })
            return res.render('index.ejs', { dataUser: JSON.stringify(data) });
        }

    );
}

module.exports = { //đây là 1 obj, export funcion thì ở chỗ khác mới sử dụng đc
    getHomePage
}