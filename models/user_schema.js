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
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
});
module.exports = new mongoose.model("user", user);
