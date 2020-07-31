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
const student = require('./models/students_scheme');
const expressEjsLayouts = require('express-ejs-layouts')
const indexRoute = require('./routes/index')
const allStudent = require('./routes/students/student')
const studentCreate = require('./routes/students/create')
const studentUpdate = require('./routes/students/update')
const imageTypes = ['image/jpeg', 'image/png', 'images/gif']

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
app.set('layout', 'layouts/layout.ejs')
app.use(expressEjsLayouts)
app.use(express.static('public'))
//use url encoder for get the data 
app.use(express.urlencoded({ limit: '10mb', extended: false }));

//use express session for use flash messuage
app.use(session({ secret: 'soumenkhara', saveUninitialized: true, resave: true }))
//use flash for the small success and error message display in html
app.use(flash())



// index route
app.use('/', indexRoute)

//student route
app.use('/student', allStudent)

app.use('/update', studentUpdate)

// student create route
app.use('/create', studentCreate)
//starting the server
app.listen(port, e => {
    console.log('Listen on port ', port)
})