import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRouter = (app) => {
    router.get('/get-all-user', APIController.getAllUser); //gọi đến getHomePage trong homeController, k truyền vào đóng mở ngoặc vì nếu có ngoặc sẽ k lấy đc req và res, nếu k có ngoặc thì mặc định tham số nào của express có của thằng cha thì sẽ truyền vào thằng con

    router.get('/detailUser/:userID', APIController.getDetailUser) //sau dấu : là giá trị truyền vào url
    
    router.post('/create-user', APIController.createNewUser) 

    router.put('/edit-user', APIController.editUser) 

    router.delete('/delete-user/:userID', APIController.deleteUser) 

    router.get('/hello', (req, res) => {
        res.send("Hello Công Thắng");
    })

    return app.use('/api', router); //tiền tố trước mỗi route
}

module.exports = initAPIRouter;
// export default initWebRouter;