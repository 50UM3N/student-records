const express = require("express");
const route = express.Router();
const student = require("../../models/students_scheme");
const imageTypes = ["image/jpeg", "image/png", "images/gif"];
const { authorize, isAdmin } = require("../routeChecker");
//student update post route

route.use(authorize);
route.use(isAdmin);
route.post("/:id", imageToBase64, (req, res) => {
  student.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    (err, data) => {
      if (err) {
        req.flash("msg", "Server Error");
        res.redirect(`/update/${req.params.id}`);
      }
      if (data) {
        console.log("Update");
        res.redirect(`/student/${req.params.id}`);
      } else {
        req.flash("msg", "Somethings Wrong");
        console.log(" error");
        res.redirect(`/update/${req.params.id}`);
      }
    }
  );
});

// root route /update
route.get("/", (req, res) => {
  res.redirect("/student");
});

//student update get route
route.get("/:id", (req, res) => {
  //find one student that has to edit the info
  if (
    req.params.id === undefined ||
    req.params.id === "" ||
    req.params.id === null
  ) {
    res.redirect("/student");
  }
  student.findById(req.params.id, (err, data) => {
    if (err) {
      res.redirect("/student");
    }

    if (data) {
      res.render("student/update.ejs", {
        title: data.name,
        student: data,
        user: req.user,
      });
    }
  });
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
    res.redirect("/Update");
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
