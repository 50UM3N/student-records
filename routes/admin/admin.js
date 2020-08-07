const express = require("express");
const route = express.Router();
const { isAdmin } = require("../routeChecker");

route.use(isAdmin);

route.get("/", (req, res) => {
  res.render("admin/admin.ejs", { title: "Admin Panel" });
});
module.exports = route;
