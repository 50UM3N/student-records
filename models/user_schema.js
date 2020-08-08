const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  authType: {
    type: String,
    default: null,
  },
  authId: {
    type: String,
    default: null,
  },
  authUsername: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    require: true,
  },
});
module.exports = new mongoose.model("user", user);
