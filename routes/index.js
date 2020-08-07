const express = require("express");
const route = express.Router();

//main home rote
route.get("/", (req, res) => {
  res.render("index.ejs", { title: "S-Manager", user: req.user });
});

module.exports = route;
