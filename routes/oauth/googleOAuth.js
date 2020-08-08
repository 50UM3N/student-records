const express = require("express");
const route = express.Router();
const passport = require("passport");

// main authenticate route
route.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// google callback route
route.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = route;
