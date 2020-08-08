const googleStrategy = require("passport-google-oauth2").Strategy;

function googleAuthenticator(passport, user) {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );
}

module.exports = googleAuthenticator;
