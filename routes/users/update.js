const express = require("express");
const route = express.Router();
const { authorize } = require("../routeChecker");
const user = require("../../models/user_schema");

route.use(authorize);
route.post("/:id", (req, res) => {
  const updateData = req.body;
  console.log(updateData);
  user.findByIdAndUpdate(req.params.id, updateData, (err, data) => {
    if (err) {
      req.flash("error", "Database problem");
      res.redirect("/user");
    }

    if (data) {
      req.flash("success", "Your info is updated");
      res.redirect("/user");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = route;
