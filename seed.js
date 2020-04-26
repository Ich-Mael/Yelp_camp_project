//jshint esversion: 6

const mongoose = require('mongoose');
const Comment = require("./models/comment");
const Campground = require("./models/campground");

let data = [
    {name: "Toronto",
     image:"https://media.gettyimages.com/photos/directly-above-shot-of-children-drawing-on-playground-picture-id611465597?s=2048x2048",
     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqa phasellus faucibus scelerisque eleifend donec pretium vulputate. Libero id faucibus nisl tincidunt eget nullam."
    },
    {name: "Philadelphia",
     image:"https://media.gettyimages.com/photos/girl-upside-down-on-the-jungle-gym-picture-id1127705002?s=2048x2048",
     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorsque eleifend donec pretium vulputate. Libero id faucibus nisl tincidunt eget nullam."

    },
    {name: "houston",
     image:"https://media.gettyimages.com/photos/cropped-view-of-happy-baby-on-swing-at-park-picture-id1155438267?s=2048x2048",
     description:"Lorem ipsu. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Libero id faucibus nisl tincidunt eget nullam."
    }
];



function seedDB(){  
 Campground.remove({}, (err)=>{
    // if(err){
    // 	console.log(err);
    // }else{
    // 	console.log("Campgrounds removed!!!");
    //     Comment.remove();	
    // 	data.forEach((camp)=>{
    // 	    Campground.create(camp, (err, addedCamp)=>{
    // 		if(err){
    // 		    console.log(err);
    // 		}else{
    // 		    console.log("Campground Added");
    // 		    // Create a comment
    // 		    Comment.create({
    // 			text: " Welcome to the beautiful place in the world",
    // 			author: "Moris Jhonson"
    // 		    }, (err, comment)=>{
    // 			if(err){
    // 			    console,log(err);
    // 			}else{
    // 			    addedCamp.comments.push(comment);
    // 			    addedCamp.save();
    // 			    console.log("Created new Comment");
    // 			}
    // 		    });
    // 		}
    // 	    });
    // 	});
    // }
});
}

module.exports = seedDB ;
