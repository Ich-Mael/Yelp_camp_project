// jshint esversion: 6

const express = require('express');
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment"); 

//campgrounds route

router.get("/", (req, res)=>{
    // gettind all campgrounds from the DB.
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }else{
            console.log(req.user);
            //rendering the campgrounds page
            res.render("campgrounds", {camps: allCampgrounds});
        }
    });
});


// adding a post to allow a user to add a campgrounds

router.post("/", isLoggedIn, (req, res)=>{
    //get a data from a form

    let campName = req.body.campName;
    let campUrl = req.body.campUrl;
    let campDescription = req.body.description;
    let author ={
	id: req.user.id,
	username: req.user.username
    };

    //adding new campground to the DB
    Campground.create({name:campName,
                       image:campUrl,
                       description:campDescription,
		       author: author },(err, newCamp)=>{
                           if(err){
                               console.log(err);
                           }else{
                               console.log(newCamp);
                           }
                       });

    // redirect to campgrounds page
    res.redirect("/campgrounds");
});
// form for a new campground

router.get("/new", isLoggedIn, (req, res)=>{
    res.render("new");
});

// Show route --- for more description

router.get("/:id", (req, res)=>{
    let id = req.params.id;
    Campground.findById(id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        }else{
	    console.log(foundCampground);
            res.render("description",{ campground: foundCampground});
        }
    });
});

// Edit Campground Route

router.get("/:id/edit", (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
	if(err){
	    res.redirect("/campgrounds");
	}else{
	    res.render("campgrounds/edit", {campground:foundCampground });
	}
    }); 
});

// update Campground

router.put("/:id", (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
	if(err){
	    res.redirect("/campgrounds");
	}else{
	    res.redirect("/campgrounds/" + req.params.id);
	}
    });
});

// Destroy campground route

router.delete("/:id", (req, res)=>{
    Campground.findByIdAndRemove(req.params.id, (err)=>{
	if(err){
	    res.redirect("/campgrounds");
	}else{
	    res.redirect("/campgrounds");
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


module.exports = router ;
