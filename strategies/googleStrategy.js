const googleStrategy = require("passport-google-oauth2").Strategy;
const ROLE = require("../models/role");

function googleAuthenticator(passport, user) {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.CALLBACK_URL}/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        user.findOne({ email: profile._json.email }, (err, data) => {
          if (data) {
            if (data.authType == "google") {
              return done(null, data);
            } else {
              return done(null, false, {
                message: `User already exist use ${data.authType} login`,
              });
            }
          } else {
            user({
              email: profile._json.email,
              name: profile._json.name,
              authType: "google",
              authId: profile._json.sub,
              thumbnail: profile._json.picture,
              role: ROLE.USER,
            }).save((err, data) => {
              if (err) {
                console.log("Error in database");
                return done(err);
              }
              if (data) {
                return done(null, data);
              }
            });
          }
        });
      }
    )
  );
}

module.exports = googleAuthenticator;
