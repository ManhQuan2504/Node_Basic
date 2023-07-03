// const express = require('express'); //import library express
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRouter from './route/web';
import connection from './configs/connectDB'
require('dotenv').config();

// const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // nếu k lấy đc port ở .env thì sử dụng 3000

configViewEngine(app); //setup view engine
initWebRouter(app); // init web route

app.listen(port, () => {
    console.log(`app listening at http:localhost:${port}`);
})