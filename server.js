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
const authenticator = require("./routes/users/localstrategy");
const userSignUp = require("./routes/users/signup");
const userLogout = require("./routes/users/logout");
const userAdmin = require("./routes/admin/admin");

//connecting to the mongodb database
mongoose
  .connect(process.env.MONGO_LOCAL_URL, {
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

//logout route
app.use("/logout", userLogout);

// admin route
app.use("/admin", userAdmin);

//starting the server
app.listen(PORT, (e) => {
  console.log("Listen on port ", PORT);
});
