//creating a scheme for the student record
const mongoose = require("mongoose");
const student = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  college: {
    type: String,
    require: true,
  },
  course: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    default: null,
  },
  dob: {
    type: Date,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  imageType: {
    type: String,
    required: true,
  },
});

//converting the binary file to proper type image
student.virtual("studentImage").get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};base64,${this.image.toString("base64")}`;
  }
});

//export that student schema
module.exports = new mongoose.model("student", student);
