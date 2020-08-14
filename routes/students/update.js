const express = require("express");
const route = express.Router();
const student = require("../../models/students_scheme");
const { authorize, isCoAdminOrAdmin } = require("../routeChecker");
const { imageToBase64, calculate_age } = require("../../functions/function");

//student update post route
route.use(authorize);
route.use(isCoAdminOrAdmin);
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

module.exports = route;
