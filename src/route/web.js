import express from "express";
import homeController from '../controller/homeController';

let router = express.Router();

const initWebRouter = (app) => {
    router.get('/', homeController.getHomePage); //gọi đến getHomePage trong homeController, k truyền vào đóng mở ngoặc vì nếu có ngoặc sẽ k lấy đc req và res, nếu k có ngoặc thì mặc định tham số nào của express có của thằng cha thì sẽ truyền vào thằng con

    router.get('/hello', (req, res) => {
        res.send("Hello Công Thắng");
    })

    return app.use('/', router); //tiền tố trước mỗi route
}

module.exports = initWebRouter;
// export default initWebRouter;