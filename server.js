//declare modules and variables
//checking thar we are not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const flash = require("express-flash");
const cookie = require("cookie-session");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const passport = require("passport");
const expressEjsLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/index");
const allStudent = require("./routes/students/student");
const studentCreate = require("./routes/students/create");
const studentUpdate = require("./routes/students/update");
const userSignIn = require("./routes/users/login");
const user = require("./models/user_schema");
const authenticator = require("./strategies/localStrategy");
const googleAuthenticator = require("./strategies/googleStrategy");
const githubAuthenticator = require("./strategies/githubStrategy");
const userSignUp = require("./routes/users/signup");
const userLogout = require("./routes/users/logout");
const userAdmin = require("./routes/admin/admin");
const oauthGoogle = require("./routes/oauth/googleOAuth");
const oauthGitHub = require("./routes/oauth/githubOAuth");
const userInfo = require("./routes/users/user");
const userUpdate = require("./routes/users/update");

//initialize github authenticator
githubAuthenticator(passport, user);
//initialize google authenticator
googleAuthenticator(passport, user);
//connecting to the mongodb database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Connected");
  });

//use cookie session for use flash message
app.use(
  cookie({
    maxAge: 30 * 60 * 1000,
    keys: ["soumenkhara"],
  })
);
//local passport strategy
authenticator(passport, user);
//use password initializes
app.use(passport.initialize());
//use session for further use cookie session
app.use(passport.session());
//use flash for the small success and error message display in html
app.use(flash());
//setting up view engines to ejs
app.set("view-engine", "ejs");
// set the global layouts
app.set("layout", "layouts/layout.ejs");
// use express ejs layouts
app.use(expressEjsLayouts);
// set the static folder
app.use(express.static("public"));
//use url encoder for get the data
app.use(express.urlencoded({ limit: "10mb", extended: false }));

// index route
app.use("/", indexRoute);

//student route
app.use("/student", allStudent);

app.use("/update", studentUpdate);

// student create route
app.use("/create", studentCreate);

// user login route
app.use("/login", userSignIn);

//signup route
app.use("/signup", userSignUp);

// user email and name update
app.use("/user/update", userUpdate);

//logout route
app.use("/logout", userLogout);

// user info route
app.use("/user", userInfo);
// admin route
app.use("/admin", userAdmin);

// google oauth route
app.use("/auth/google", oauthGoogle);

// github oauth route
app.use("/auth/github", oauthGitHub);
//starting the server
app.listen(PORT, (e) => {
  console.log("Listen on port ", PORT);
});
