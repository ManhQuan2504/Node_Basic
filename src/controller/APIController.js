import { json } from 'body-parser';
import connection from '../configs/connectDB';

let getAllUser = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM admin`, function (err, results, fields) {
                if (err) {
                    reject(err); // Xử lý lỗi
                } else {
                    resolve(results); // Trả về dữ liệu thành công
                }
            });
        });

        console.log(data);
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.error('Lỗi:', error);
        // Xử lý lỗi nếu cần
    }
};

let getDetailUser = async (req, res) => {
    try {
        let userID = req.params.userID;
        if (!userID) {
            return res.status(200).json({
                message: 'missing requied param !!!'
            })
        }

        let data = await new Promise((resolve, reject) => {
            let userID = req.params.userID;
            connection.query('SELECT * FROM admin WHERE TK = ?', [userID], function (err, results, fields) {
                if (err) {
                    reject(err); // Xử lý lỗi
                } else {
                    resolve(results); // Trả về dữ liệu thành công
                }
            });
        });

        console.log(data);
        return res.status(200).json({
            data
        })

    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần
    }
};

let createNewUser = async (req, res) => {
    try {
        let { userTK, userMK, userName } = req.body;
        if (!userTK || !userMK || !userName) {
            return res.status(200).json({
                message: 'missing requied param !!!'
            })
        }

        console.log({ userTK, userMK, userName });
        await new Promise((resolve, reject) => {
            connection.query('INSERT INTO admin (TK, MK, Name) value (?, ?, ?)', [userTK, userMK, userName], function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

        return res.status(200).json({
            message: 'ok'
        })
    } catch (error) {
        console.log(error);
    }
}

let deleteUser = async (req, res) => {
    try {
        let userID = req.params.userID;
        if (!userID) {
            return res.status(200).json({
                message: 'missing requied param !!!'
            })
        }

        await new Promise((resolve, reject) => {
            connection.query('DELETE FROM admin WHERE TK = ?', [userID], function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

        return res.status(200).json({
            message: 'ok'
        })
    } catch (error) {
        console.log(error);
    }
}

// let getEditUser = async (req, res) => {
//     try {
//         const data = await new Promise((resolve, reject) => {
//             let userTK = req.params.userTK;
//             connection.query('SELECT * FROM admin WHERE TK = ?', [userTK], function (err, results, fields) {
//                 if (err) {
//                     reject(err); // Xử lý lỗi
//                 } else {
//                     resolve(results); // Trả về dữ liệu thành công
//                 }
//             });
//         });
//         console.log('>>>', data);
//         res.render('updateAdmin.ejs', { dataUser: data[0] });
//     } catch (error) {
//         console.error(error);
//         // Xử lý lỗi nếu cần
//     }
// };

let editUser = async (req, res) => {
    try {
        let { oldUserTK, newUserTK, userMK, userName } = req.body;
        if (!oldUserTK || !newUserTK || !userMK || !userName) {
            return res.status(200).json({
                message: 'missing requied param !!!'
            })
        }

        await new Promise((resolve, reject) => {
            connection.query('UPDATE admin SET TK = ?, MK = ?, Name = ? WHERE TK = ?', [newUserTK, userMK, userName, oldUserTK], function (err, results, fields) {
                if (err) {
                    reject(err); // Xử lý lỗi
                } else {
                    resolve(results); // Trả về kết quả thành công
                }
            });
        });

        return res.status(200).json({
            message: 'ok'
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = { //đây là 1 obj, export funcion thì ở chỗ khác mới sử dụng đc
    getAllUser,
    getDetailUser,
    createNewUser,
    deleteUser,
    // getEditUser,
    editUser
}