const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  profilePicPath: String,
});

const user = mongoose.model("user", userSchema);

module.exports = {
  users: user,
};
