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

//use url encoder for get the data 
app.use(express.urlencoded({
    limit: '10mb',
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
    //store the image data to the variable
    const imageData = req.body.studentImage
    //fined that some one has alredy exist in the databse
    student.findOne({
        email: req.body.email
    }, (err, data) => {
        if (err) {
            req.flash('msg', 'Creation Unsuccessful')
            res.redirect('/create')
        }
        if (data) {
            if (data.email == req.body.email) {
                req.flash('msg', 'Student already exist')
                res.redirect('/create')
            }
        } else {
            //if all condition are satisfy the add tha t user in the database

            //check that the is not send to the server
            let image, imageType
            const studentImage = JSON.parse(imageData)
            if (studentImage != null && imageTypes.includes(studentImage.type)) {
                //convert the image file into base64 encoded binary file
                image = new Buffer.from(studentImage.data, 'base64')
                imageType = studentImage.type
            }

            // save the valid results
            student({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                degree: req.body.degree,
                image: image,
                imageType: imageType
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

app.post('/update', (req, res) => {
    //store the all data come form the form
    const imageData = req.body.studentImage

    //check that the is not send to the server
    let updateData = {}
    if (imageData != null && imageData != undefined && imageData != '') {
        const studentImage = JSON.parse(imageData)
        if (studentImage != null && imageTypes.includes(studentImage.type)) {
            //convert the image file into base64 encoded binary file
            updateData.image = new Buffer.from(studentImage.data, 'base64')
            updateData.imageType = studentImage.type
        }
    }
    updateData.name = req.body.name
    updateData.email = req.body.email
    updateData.phone = req.body.phone
    updateData.degree = req.body.degree
    //find the student with the help if id and update the details
    student.findByIdAndUpdate(req.body.id, updateData, (err, data) => {
        if (err) {
            req.flash('msg', 'Server Error')
            res.redirect('/update')
        }
        if (data) {
            console.log("Update")
            res.redirect(`/student?email=${req.body.email}`)
        } else {
            req.flash('msg', 'Somethings Wrong')
            console.log(" error")
            res.redirect('/update')
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
    //check that search variable is active or note
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

//student update route
app.get('/update', (req, res) => {
    //find one student that has to edit the info
    student.findOne({
        email: req.query.email
    }, (err, data) => {
        res.render('update.ejs', {
            student: data
        })
    })

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

//middleware for update student route 