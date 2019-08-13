const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  posts: [{ title: String, content: String }]
});

module.exports = mongoose.model("users", userSchema)