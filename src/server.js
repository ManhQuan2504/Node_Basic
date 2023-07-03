// const express = require('express'); //import library express
import express from 'express';
import configViewEngine from './configs/viewEngine';
require('dotenv').config();

// const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // nếu k lấy đc port ở .env thì sử dụng 3000

configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/hello', (req, res) => {
    res.send("Hello Công Thắng");
})

app.listen(port, () => {
    console.log(`app listening at http:localhost:${port}`);
})