const githubStrategy = require("passport-github2").Strategy;
const ROLE = require("../models/role");

function githubAuthenticator(passport, user) {
  passport.use(
    new githubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        user.findOne({ email: profile._json.email }, (err, data) => {
          if (data) {
            if (data.authType == "github") {
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
              authType: "github",
              authId: profile._json.id,
              authUsername: profile._json.login,
              thumbnail: profile._json.avatar_url,
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

module.exports = githubAuthenticator;
