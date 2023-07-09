// const express = require('express'); //import library express
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRouter from './route/web';
import initAPIRouter from './route/api';



// import connection from './configs/connectDB'
require('dotenv').config();

// const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // nếu k lấy đc port ở .env thì sử dụng 3000

app.use(express.urlencoded({ extended: true })); // cấu hình để sử dụng bodyParter
app.use(express.json()); //như trên

configViewEngine(app); //setup view engine
initWebRouter(app); // init web route
initAPIRouter(app);

//handle middle ware 404 not found: chạy vào từ trên xuống dưới, vào web k có vào api k có thì chạy xuống đến đây
app.use((req, res) => {
    res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`app listening at http:localhost:${port}`);
})