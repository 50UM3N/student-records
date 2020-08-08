const ROLE = require("../models/role");

// check if the user is authorized to a route
function authorize(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

// don't redirect logged in use into signup and login page
function notAuthorize(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}

// check the user is admin or not
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
