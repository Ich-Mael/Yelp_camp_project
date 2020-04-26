// jshint esversion: 6
/*
==========================
Comments Route
==========================
*/

const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment"); 

router.get("/new", isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
	if(err){
	    console.log(err);
	}else{
    res.render("comments/new", {campground: campground});
	}
    });
});


router.post("/", isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
	if(err){
	    console.log(err);
	    res.redirect("/camprounds");
	}else{
	    //add username and id to comment
	    //save comment
	    Comment.create(req.body.comment, (err, comment)=>{
		comment.author.id = req.user.id;
		comment.author.username =req.user.username;
		comment.save();  
		campground.comments.push(comment);
		campground.save();
		res.redirect("/campgrounds/" + campground.id);
	    });
	}
    });
});


//function to check login state

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
