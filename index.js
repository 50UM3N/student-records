//declare modules and variables
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const mongoose = require('mongoose');
const user = require('./schema');

//setting up view engines to ejs
app.set("view-engine", "ejs");

//use url encoder for get the data 
app.use(express.urlencoded({
    extended: false
}));

//starting the server
app.listen(port, e => {
    console.log('Listen on port ', port)
})