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
const middlewareObj = require('../middleware');

router.get("/new", middlewareObj.isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
	if(err){
	    console.log(err);
	}else{
    res.render("comments/new", {campground: campground});
	}
    });
});


router.post("/", middlewareObj.isLoggedIn, (req,res)=>{
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
		req.flash("Success", "Comment Successfully Added!");
		res.redirect("/campgrounds/" + campground.id);
	    });
	}
    });
});


// edit route

router.get("/:comment_id/edit",  middlewareObj.isLoggedIn, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
	if(err){
	    res.redirect('back');
	}else{
	    res.render("comments/edit", {campground_id: req.params.id, comment: foundComment }); 
	}
    }); 
});

// update route

router.put("/:comment_id",  middlewareObj.isLoggedIn, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
	if(err){
	    res.redirect('back');
	}else{
		req.flash("Success", "Comment Successfully Edited!");
	    res.redirect("/campgrounds/" + req.params.id);
	}
    });
});

// destroy comment route

router.delete("/:comment_id",  middlewareObj.isLoggedIn, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
	if(err){
	    res.redirect('back');
	}else{
		req.flash("Success", "Comment Successfully Deleted!");
	    res.redirect('/campgrounds/' + req.params.id);
	}
    });
});

module.exports = router;
