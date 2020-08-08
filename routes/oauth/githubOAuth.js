const express = require("express");
const route = express.Router();
const passport = require("passport");

// github authenticate route
route.get(
  "/",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

// github callback route
route.get(
  "/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = route;
