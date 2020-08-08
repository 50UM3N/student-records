const express = require("express");
const route = express.Router();
const { authorize } = require("../routeChecker");
// user information route
route.use(authorize);
route.get("/", (req, res) => {
  res.render("user/user.ejs", { title: req.user.name, user: req.user });
});

module.exports = route;
