const express = require("express");
const route = express.Router();
const student = require("../../models/students_scheme");
const imageTypes = ["image/jpeg", "image/png", "images/gif"];
const { authorize, isAdmin } = require("../routeChecker");
route.use(authorize);
route.use(isAdmin);
// new student post route
route.post("/", (req, res) => {
  //store the image data to the variable
  const imageData = req.body.image;
  //fined that some one has alredy exist in the databse
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
        //if all condition are satisfy the add tha t user in the database

        //check that the is not send to the server
        let image, imageType;
        const studentImage = JSON.parse(imageData);
        if (studentImage != null && imageTypes.includes(studentImage.type)) {
          //convert the image file into base64 encoded binary file
          image = new Buffer.from(studentImage.data, "base64");
          imageType = studentImage.type;
        }

        // save the valid results
        student({
          name: req.body.name,
          college: req.body.institute,
          course: req.body.course,
          yser: req.body.sem,
          email: req.body.email,
          phone: req.body.phone,
          dob: req.body.dob,
          age: calculate_age(req.body.dob),
          address: req.body.address,
          image: image,
          imageType: imageType,
        }).save((err, data) => {
          if (err) {
            console.log("Error in database");
            req.flash("msg", "Creation Unsuccessful");
            res.redirect("/create");
          }
          if (data) {
            console.log("succes");
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

// for calculating the age
function calculate_age(birth) {
  var birthDate = new Date(birth);
  var cur = new Date();
  var diff = cur - birthDate;
  var age = Math.floor(diff / 31557600000);
  return Number(age);
}
module.exports = route;
