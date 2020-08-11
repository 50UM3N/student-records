const express = require("express");
const route = express.Router();
const student = require("../../models/students_scheme");
const imageTypes = ["image/jpeg", "image/png", "images/gif"];
const { authorize, isAdmin } = require("../routeChecker");
route.use(authorize);
route.use(isAdmin);

// new student post route
route.post("/", imageToBase64, (req, res) => {
  //fined that some one has already exist in the database
  student.findOne(
    {
      email: req.body.email,
    },
    (err, data) => {
      if (err) {
        req.flash("msg", "Creation Unsuccessful");
        res.redirect("/create");
      }
      if (data) {
        if (data.email == req.body.email) {
          req.flash("msg", "Student already exist");
          res.redirect("/create");
        }
      } else {
        // save the valid results
        student({
          name: req.body.name,
          college: req.body.institute,
          course: req.body.course,
          year: req.body.sem,
          email: req.body.email,
          phone: req.body.number,
          dob: req.body.dob,
          age: calculate_age(req.body.dob),
          address: req.body.address,
          image: req.body.imageData,
          imageType: req.body.imageType,
        }).save((err, data) => {
          if (err) {
            console.log("Error in database");
            req.flash("msg", "Creation Unsuccessful");
            res.redirect("/create");
          }
          if (data) {
            console.log("Success");
            req.flash("success", "Creation Successful");
            res.redirect("/create");
          }
        });
      }
    }
  );
});

// adding new student form
route.get("/", (req, res) => {
  res.render("student/create.ejs", { title: "Add Student", user: req.user });
});

// image to buffer converter midileware
function imageToBase64(req, res, next) {
  const image = req.body.image;
  let imageType, imageData;
  const studentImage = JSON.parse(image);
  if (studentImage != null && imageTypes.includes(studentImage.type)) {
    imageData = new Buffer.from(studentImage.data, "base64");
    imageType = studentImage.type;
    req.body.imageData = imageData;
    req.body.imageType = imageType;
    return next();
  } else {
    req.flash({ msg: "Error uploading image" });
    res.redirect("/create");
  }
}

// for calculating the age
function calculate_age(birth) {
  var birthDate = new Date(birth);
  var cur = new Date();
  var diff = cur - birthDate;
  var age = Math.floor(diff / 31557600000);
  return Number(age);
}
module.exports = route;
