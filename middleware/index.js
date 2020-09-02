// all middleware goes here
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middlewareObj = {};

//function to check login state
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("Error", "Please Login First!!");
    res.redirect("/login");
}


// Check campground ownwership
middlewareObj.checkCampgroundOwnership = function (req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
	Campground.findById(req.params.id, (err, foundCampground)=>{
	    if(err){
		req.flash("Error", "Campground not found");
		res.redirect("back");
	    }else{
		// Does the user own a campground ??
		if(foundCampground.author.id.equals(req.user.id)){
	            next();
		}else{
		req.flash("Error", "You don't have permission to do that!");
		    res.redirect("back");    
		}
	    }
	}); 
    }else{
		req.flash("Error", "You must log in first!");
	res.redirect("back");
    }   
}




module.exports = middlewareObj