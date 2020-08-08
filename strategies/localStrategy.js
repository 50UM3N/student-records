const localStrategy = require("passport-local").Strategy;

//local custom strategy
function passportAuthenticator(passport, user) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      user.findOne({ email: email }, (err, data) => {
        if (err) {
          return done(err);
        }
        if (!data) {
          return done(null, false, { message: "No user with that email" });
        } else {
          if (data.password == password) {
            return done(null, data);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        }
      });
    })
  );
  //serialize user to cookie
  passport.serializeUser((data, done) => {
    done(null, data.id);
  });
  //deserialize user
  passport.deserializeUser((id, done) => {
    user.findById(id, (err, data) => {
      done(null, data);
    });
  });
}

module.exports = passportAuthenticator;
