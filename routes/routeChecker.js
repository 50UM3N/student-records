const ROLE = require("../models/role");

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

// check the user is co admin or not
function isCoAdminOrAdmin(req, res, next) {
  if (
    req.isAuthenticated() &&
    (req.user.role == ROLE.CO_ADMIN || req.user.role == ROLE.ADMIN)
  ) {
    return next();
  }
  return res.redirect("/");
}

// check the user is admin or not
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role == ROLE.ADMIN) {
    return next();
  }
  return res.redirect("/");
}
module.exports = {
  authorize,
  notAuthorize,
  isAdmin,
  isCoAdminOrAdmin,
};
