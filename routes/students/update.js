const express = require("express");
const route = express.Router();
const student = require("../../models/students_scheme");
const imageTypes = ["image/jpeg", "image/png", "images/gif"];
const { authorize, isAdmin } = require("../routeChecker");
//student update post route

route.use(authorize);
route.use(isAdmin);
route.post("/", (req, res) => {
  //store the all data come form the form
  const imageData = req.body.studentImage;

  //check that the is not send to the server
  let updateData = {};
  if (imageData != null && imageData != undefined && imageData != "") {
    const studentImage = JSON.parse(imageData);
    if (studentImage != null && imageTypes.includes(studentImage.type)) {
      //convert the image file into base64 encoded binary file
      updateData.image = new Buffer.from(studentImage.data, "base64");
      updateData.imageType = studentImage.type;
    }
  }
  updateData.name = req.body.name;
  updateData.email = req.body.email;
  updateData.phone = req.body.phone;
  updateData.degree = req.body.degree;
  //find the student with the help if id and update the details
  student.findByIdAndUpdate(req.body.id, updateData, (err, data) => {
    if (err) {
      req.flash("msg", "Server Error");
      res.redirect(`/update/${req.body.id}`);
    }
    if (data) {
      console.log("Update");
      res.redirect(`/student/${req.body.id}`);
    } else {
      req.flash("msg", "Somethings Wrong");
      console.log(" error");
      res.redirect(`/update/${req.body.id}`);
    }
  });
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
      });
    }
  });
});

module.exports = route;
