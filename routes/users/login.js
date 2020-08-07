const express = require("express");
const route = express.Router();
const passport = require("passport");
const { notAuthorize } = require("../routeChecker");

route.use(notAuthorize);
// Login post route
route.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// login get route
route.get("/", (req, res) => {
  res.render("user/login.ejs", { title: "Login" });
});
module.exports = route;
