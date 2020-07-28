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
    },
    image: {
        type: Buffer,
        required: true
    },
    imageType: {
        type: String,
        required: true
    },
});

student.virtual('studentImage').get(function () {
    if (this.image != null && this.imageType != null) {
        return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
})

//export that student schema 
module.exports = new mongoose.model('student', student);