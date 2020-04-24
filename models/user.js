// jshint esversion: 6
const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(require("passport-local-mongoose"));

module.exports = mongoose.model("User", userSchema);
