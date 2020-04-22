
const mongoose = require('mongoose');
const Comment = require("./comment");

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[{
	type: mongoose.Schema.Types.ObjectId,
	ref: Comment
    }]
});

module.exports = mongoose.model("campground", campgroundSchema);

