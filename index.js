//declare modules and variables
//checking thar we are not in production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const flash = require('express-flash')
const session = require('express-session')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const mongoose = require('mongoose')
const student = require('./schema')

//connecting to the mongodb database
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Database Connected')
    });


//setting up view engines to ejs
app.set("view-engine", "ejs")

//use url encoder for get the data 
app.use(express.urlencoded({
    extended: false
}));

//use express session for use flash messuage
app.use(session({
    secret: 'soumenkhara',
    saveUninitialized: true,
    resave: true
}))
//use flash for the small success and error message display in html
app.use(flash())

app.post('/create', (req, res) => {
    const {
        name,
        email,
        phone,
        degree
    } = req.body
    student.findOne({
        email: email
    }, (err, data) => {
        if (err) {
            req.flash('msg', 'Creation Unsuccessful')
            res.redirect('/create')
        }
        if (data) {
            if (data.email == email) {
                req.flash('msg', 'Student already exist')
                res.redirect('/create')
            }
        } else {
            student({
                name,
                email,
                phone,
                degree
            }).save((err, data) => {
                if (err) {
                    console.log('Error in database')
                    req.flash('msg', 'Creation Unsuccessful')
                    res.redirect('/create')
                }
                if (data) {
                    console.log(data)
                    req.flash('success', 'Creation Successful');
                    res.redirect('/create')
                }
            });
        }
    })
})

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