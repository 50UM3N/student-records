const ROLE = require("../models/role");

function authorize(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

function notAuthorize(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role == ROLE.ADMIN) {
    console.log("admin");
    return next();
  }
  console.log("Not admin");
  return res.redirect("/");
}
module.exports = {
  authorize,
  notAuthorize,
  isAdmin,
};
