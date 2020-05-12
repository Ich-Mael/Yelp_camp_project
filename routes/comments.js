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


// edit route

router.get("/:comment_id/edit", (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
	if(err){
	    res.redirect('back');
	}else{
	    res.render("comments/edit", {campground_id: req.params.id, comment: foundComment }); 
	    
	}
    }); 
});

// update route

router.put("/:comment_id", (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
	if(err){
	    res.redirect('back');
	}else{
	    res.redirect("/campgrounds/" + req.params.id);
	}
    });
});

// destroy comment route

router.delete("/:comment_id", (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
	if(err){
	    res.redirect('back');
	}else{
	    res.redirect('/campgrounds/' + req.params.id);
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
