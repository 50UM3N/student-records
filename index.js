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
    //store the all data come form the form
    const {
        name,
        email,
        phone,
        degree
    } = req.body
    //fined that some one has alredy exist in the databse
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
            //if all condition are satisfy the add tha t user in the database
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
            })
        }
    })
})

//main home rote
app.get('/', (req, res) => {

    res.render('index.ejs')
})

// all students and search route
app.get('/students', (req, res) => {
    let searchOption = {}
    //check that search variable is avtive or note
    if (req.body.name !== null && req.body.name !== '') {
        searchOption.name = new RegExp(req.query.name, 'i')

    }
    //search for all data or for a specific kind for student/s
    student.find(searchOption, (err, data) => {
        if (data) {
            if (err) {
                req.redirect('/')
            }
            if (data) {
                console.log(data)
                res.render('students.ejs', {
                    students: data,
                    searchedData: req.query
                })
            }
        } else {
            req.redirect('/')
        }
    })
})
//individual student routes
app.get('/student', checkParam, (req, res) => {
    //Get the student data

    student.findOne({
        email: req.query.email
    }, (err, data) => {
        res.render('student.ejs', {
            student: data
        })
    })

})
//create student routs

app.get('/create', (req, res) => {
    res.render('create.ejs')
})

//starting the server
app.listen(port, e => {
    console.log('Listen on port ', port)
})

//middleware fore the unauthorized student chalking
function checkParam(req, res, next) {
    if (req.query.email === undefined || req.query.email === '') {
        return res.redirect('/')
    } else {
        return next()
    }
}