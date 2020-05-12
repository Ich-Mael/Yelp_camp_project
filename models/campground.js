// jshint esversion:6

const mongoose = require('mongoose');
const Comment = require("./comment");

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
	id:{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: "User"
	},
	username: String
    },
    comments:[{
	type: mongoose.Schema.Types.ObjectId,
	ref: Comment
    }]
});


module.exports = mongoose.model("campground", campgroundSchema);

