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

route.get("/delete/:id", (req, res) => {
  console.log(req.params.id);
  user.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      console.log("Deleted" + data.id);
      res.redirect("/admin");
    }
  });
});

route.get("/update", (req, res) => {
  const { role, id } = req.query;
  user.findByIdAndUpdate(id, { role: role }, (err, data) => {
    if (err) {
      console.log(err);
      res.redirect("/admin");
    }
    if (data) {
      res.redirect("/admin");
    } else {
      res.redirect("/admin");
    }
  });
});
module.exports = route;
