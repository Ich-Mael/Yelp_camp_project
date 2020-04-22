//jshint esversion: 6

const app = (require("express"))();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comment = require("./models/comment")
seedDB = require("./seed");
mongoose.connect("mongodb://localhost/yelp-camp",{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// setting the schema
// adding campground to the database




// let camps=[
//     {name: "Namek",
//      image: "https://media.gettyimages.com/photos/birthday-party-picture-id1035763336?s=2048x2048"},
//     {name: "Ecuomondo",
//      image: "https://media.gettyimages.com/photos/children-having-fun-in-ropes-course-adventure-park-picture-id689947182?s=2048x2048"},
//     {name: "Marine Ford",
//      image: "https://media.gettyimages.com/photos/group-of-kids-in-a-tugofwar-game-picture-id498425450?s=2048x2048"}
// ]
// ;

seedDB();
// home route
app.get("/", (req, res)=>{
    res.render("home");
});

//campgrounds route

app.get("/campgrounds", (req, res)=>{
    // gettind all campgrounds from the DB.
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }else{
            //rendering the campgrounds page
            res.render("campgrounds", {camps: allCampgrounds});
            console.log(allCampgrounds);
        }
    });
});


// adding a post to allow a user to add a campgrounds

app.post("/campgrounds", (req, res)=>{
    //get a data from a form

    let campName = req.body.campName;
    let campUrl = req.body.campUrl;
    let campDescription = req.body.description;
    let newCampground = {name: campName, image: campUrl, description: campDescription};

    //adding new campground to the DB
    Campground.create({name:campName,
                       image:campUrl,
                       description:campDescription},(err, newCamp)=>{
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

    app.get("/campgrounds/new", (req, res)=>{
        res.render("new");
    });

    // Show route --- for more description

    app.get("/campgrounds/:id", (req, res)=>{
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

/*
==========================
Comments Route
==========================
*/

app.get("/campgrounds/:id/comments/new", (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
	if(err){
	    console.log(err);
	}else{
    res.render("comments/new", {campground: campground});
	}
    });
});


app.post("/campgrounds/:id/comments", (req,res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
	if(err){
	    console.log(err);
	    res.redirect("/camprounds");
	}else{
	    Comment.create(req.body.comment, (err, comment)=>{
		campground.comments.push(comment);
		campground.save();
		res.redirect("/campgrounds/" + campground.id)
	    });
	}
    });
});



    //route for page not found
    app.get("*", (req, res)=>{
        res.send("Page not found");
    });


    app.listen(3000, ()=>{
        console.log("Server has Started");
    });
