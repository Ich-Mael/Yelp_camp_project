// jshint esversion: 6

//==============================
// Authentication Routes
//==============================

const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


//Registration route
router.get("/register", (req, res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash('Error', err.message);
            // console.log(err, err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash('Success', "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Login routes

router.get("/login", (req, res)=>{
    res.render("login");
});


router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

// logout route

router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("Success", "You have successfully logged out");
    res.redirect("/");
});


//function to check login state

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;
