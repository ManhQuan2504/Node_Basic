import express from "express";
import homeController from '../controller/homeController';
import multer from "multer";
import path from 'path';
var appRoot = require('app-root-path');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;

let upload = multer({ storage: storage, fileFilter: imageFilter });


const initWebRouter = (app) => {
    router.get('/get-all-user', homeController.getHomePage); //gọi đến getHomePage trong homeController, k truyền vào đóng mở ngoặc vì nếu có ngoặc sẽ k lấy đc req và res, nếu k có ngoặc thì mặc định tham số nào của express có của thằng cha thì sẽ truyền vào thằng con

    router.get('/detail/user/:userID', homeController.getDetailUser) //sau dấu : là giá trị truyền vào url

    router.post('/create-new-user', homeController.createNewUser) //dùng tiền tố get thì mới test đc trên trình duyệt, mấy cái khác nó báo lỗi

    router.post('/get-edit-user/:userTK', homeController.getEditUser)

    router.post('/edit-user', homeController.editUser)

    router.post('/delete-user', homeController.deleteUser)

    router.get('/upload-page', homeController.getUploadFilePage)

    router.post('/upload-single-file', upload.single('singleFile'), homeController.uploadSingleFile)

    router.post('/upload-multiple-file', upload.array('multiFile', 2), homeController.uploadMultipleFile);


    router.get('/', (req, res) => {
        res.send("Hello Công Thắng");
    })

    return app.use('/', router); //tiền tố trước mỗi route
}

module.exports = initWebRouter;
// export default initWebRouter;