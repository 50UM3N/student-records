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


app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/students', (req, res) => {
    res.render('students.ejs')
})
app.get('/student', (req, res) => {
    res.render('student.ejs')
})
app.get('/create', (req, res) => {
    res.render('create.ejs')
})

//starting the server
app.listen(port, e => {
    console.log('Listen on port ', port)
})