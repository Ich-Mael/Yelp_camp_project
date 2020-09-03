//jshint esversion: 6
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const Comment = require("./models/comment");
const Campground = require("./models/campground");
const User = require("./models/user");
const seedDB = require("./seed");
const commentRoutes = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      authRoutes = require("./routes/authentication");

const connectDB = require('./connection');

connectDB();
// mongoose.connect("mongodb://localhost/yelp-camp",{useNewUrlParser: true, useUnifiedTopology: true});
const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); 
app.use(flash());

// Passport Configuration 
 app.use(require("express-session")({
    secret: "I really don't care who you are",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

// middleware for setting req.user

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("Error");
    res.locals.success = req.flash("Success");
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);


// function to seed data in the database



// home route
app.get("/", (req, res)=>{
    res.render("home");
});


// let camps=[
//     {name: "Namek",
//      image: "https://media.gettyimages.com/photos/birthday-party-picture-id1035763336?s=2048x2048"},
//     {name: "Ecuomondo",
//      image: "https://media.gettyimages.com/photos/children-having-fun-in-ropes-course-adventure-park-picture-id689947182?s=2048x2048"},
//     {name: "Marine Ford",
//      image: "https://media.gettyimages.com/photos/group-of-kids-in-a-tugofwar-game-picture-id498425450?s=2048x2048"}
// ];





//route for page not found
app.get("*", (req, res)=>{
    res.send("Page not found");
});


app.listen(port, ()=>{
    console.log("Server has Started");
});
