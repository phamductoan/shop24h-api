// import express from "express";
const express = require("express");
var mongoose = require('mongoose');

const productTypeRouter  = require("./app/router/ProductTypeRouter");
const productRouter  = require("./app/router/ProductRouter");
const customerRouter  = require("./app/router/CustomerRouter");
const orderRouter  = require("./app/router/OrderRouter");





// Khoi tao app express
const app = express();

const port = 8000;
// Su dung json
app.use(express.json());

// Doc duoc body tieng Viet
app.use(express.urlencoded({
    extended: true
}))

// Kết nối với MongoDB:
mongoose.connect("mongodb://localhost:27017/Shop24h", function(error) {
 if (error) throw error;
 console.log('Successfully connected to mongoDb');
})


// Middleware
app.use((request, response, next) => {
    console.log("Time: ", new Date());

    next();
})

app.use((request, response, next) => {
    console.log("Request method: ", request.method);
    
    next();
})

//End Middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next(); 
});



app.use("/", productTypeRouter);
app.use("/", productRouter);
app.use("/", customerRouter);
app.use("/", orderRouter);


app.listen(port, () => {
    console.log("App listening on port " + port);
})
