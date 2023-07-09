import connection from '../configs/connectDB';
import multer from 'multer';

let getHomePage = async (req, res) => {
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

        res.render('index.ejs', { dataUser: data });
    } catch (error) {
        console.error('Lỗi:', error);
        // Xử lý lỗi nếu cần
    }
};

let getDetailUser = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            let userID = req.params.userID;
            connection.query('SELECT * FROM admin WHERE TK = ?', [userID], function (err, results, fields) {
                if (err) {
                    reject(err); // Xử lý lỗi
                } else {
                    resolve(results); // Trả về dữ liệu thành công
                }
            });
        });

        res.render('index.ejs', { dataUser: data });
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần
    }
};

let createNewUser = async (req, res) => {
    try {
        let { userTK, userMK, userName } = req.body;
        console.log({ userTK, userMK, userName });
        let data = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO admin (TK, MK, Name) value (?, ?, ?)', [userTK, userMK, userName], function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

        return res.redirect('/'); // 1 dấu / sẽ đưa về trang chủ
    } catch (error) {
        console.log(error);
    }
}

let deleteUser = async (req, res) => {
    try {
        let userTKDelete = req.body.userTKDelete;
        let data = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM admin WHERE TK = ?', [userTKDelete], function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

let getEditUser = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            let userTK = req.params.userTK;
            connection.query('SELECT * FROM admin WHERE TK = ?', [userTK], function (err, results, fields) {
                if (err) {
                    reject(err); // Xử lý lỗi
                } else {
                    resolve(results); // Trả về dữ liệu thành công
                }
            });
        });
        console.log('>>>', data);
        res.render('updateAdmin.ejs', { dataUser: data[0] });
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần
    }
};

let editUser = async (req, res) => {
    try {
        let { oldUserTK, newUserTK, userMK, userName } = req.body;
        console.log({ oldUserTK, newUserTK, userMK, userName });
        let data = await new Promise((resolve, reject) => {
            connection.query('UPDATE admin SET TK = ?, MK = ?, Name = ? WHERE TK = ?', [newUserTK, userMK, userName, oldUserTK], function (err, results, fields) {
                if (err) {
                    reject(err); // Xử lý lỗi
                } else {
                    resolve(results); // Trả về kết quả thành công
                }
            });
        });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

let getUploadFilePage = (req, res) => {
    return res.render('uploadFile.ejs');
}

let uploadSingleFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    // let upload = multer({ storage: storage, fileFilter: imageFilter }).single('singleFile'); //singler trùng tên với bên view gửi lên
    let upload = multer().single('singleFile')
    console.log(req.files);

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload-page">Upload another image</a>`);
    });
}

let uploadMultipleFile = (req, res) => {
    console.log(!req.files);
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    // Handle uploaded files
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on the frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += `<hr/><a href="/upload-page">Upload more images</a>`;
    res.send(result);

}



module.exports = { //đây là 1 obj, export funcion thì ở chỗ khác mới sử dụng đc
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    getEditUser,
    editUser,
    getUploadFilePage,
    uploadSingleFile,
    uploadMultipleFile
}