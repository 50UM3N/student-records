const express = require("express");
const route = express.Router();
const user = require("../../models/user_schema");
const { isAdmin } = require("../routeChecker");

route.use(isAdmin);

route.get("/", (req, res) => {
  user.find({}, (err, data) => {
    if (err) {
      req.redirect("/");
    }
    if (data) {
      res.render("admin/admin.ejs", {
        title: "Admin Panel",
        user: req.user,
        users: data,
      });
    } else {
      req.redirect("/");
    }
  });
});
module.exports = route;
