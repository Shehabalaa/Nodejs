const mongoose = require('mongoose');

const postSchema = mongoose.Schema({ title: String, contet: String });

module.exports = mongoose.model("posts", postSchema)