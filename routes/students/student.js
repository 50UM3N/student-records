const express = require("express");
const route = express.Router();
const student = require("../../models/students_scheme");
const { authorize } = require("../routeChecker");

route.use(authorize);

// all students and search route
route.get("/", (req, res) => {
  let searchOption = {};
  //check that search variable is active or note
  if (req.body.name !== null && req.body.name !== "") {
    searchOption.name = new RegExp(req.query.name, "i");
  }
  //search for all data or for a specific kind for student/s
  student.find(searchOption, (err, data) => {
    if (err) {
      req.redirect("/");
    }
    if (data) {
      res.render("student/index.ejs", {
        title: "S-Manager",
        students: data,
        user: req.user,
        searchedData: req.query,
      });
    } else {
      req.redirect("/");
    }
  });
});

//individual student
route.get("/:id", (req, res) => {
  // student.findById(req.params.id, (err, data) => {
  //   if (err) {
  //     res.redirect("/student");
  //   }
  //   if (data) {
  //     res.render("student/student.ejs", {
  //       title: data.name,
  //       student: data,
  //       user: req.user,
  //     });
  //   }
  // });
  res.render("student/student.ejs", {
    title: "ss",
    user: req.user,
  });
});

module.exports = route;
