const express = require("express");
const route = express.Router();
const user = require("../../models/user_schema");
const { notAuthorize } = require("../routeChecker");
const ROLE = require("../../models/role");

route.use(notAuthorize);

route.post("/", (req, res) => {
  const { name, email, password, cpassword } = req.body;
  user.findOne({ email: email }, (err, data) => {
    if (err) {
      req.flash("err", "Sign Up Unsuccessful");
      res.redirect("/signup");
    }
    if (data) {
      if (data.email == email) {
        req.flash("warning", "Email is already taken");
        res.redirect("/signup");
      }
    } else {
      user({
        email: email,
        name: name,
        password: password,
        role: ROLE.USER,
        authType: "email/password",
      }).save((err, data) => {
        if (err) {
          console.log("Error in database");
          req.flash("err", "Sign Up Unsuccessful");
          res.redirect("/signup");
        }
        if (data) {
          req.flash("success", "Sign Up Successful");
          res.redirect("/login");
        }
      });
    }
  });
});

route.get("/", (req, res) => {
  res.render("user/signup.ejs", { title: "Sign Up" });
});

module.exports = route;
