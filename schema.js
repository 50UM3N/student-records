//creating a scheme for the student record
const mongoose = require('mongoose');
const student = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    degree: {
        type: String,
        require: true
    }
});

//export that student schema 
module.exports = new mongoose.model('student', student);