//jshint esversion: 6

const app = (require("express"))();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Comment = require("./models/comment")
const User = require("./models/user");



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
// ];



// function to seed data in the database
seedDB();

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

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
            console.log(req.user);
            //rendering the campgrounds page
            res.render("campgrounds", {camps: allCampgrounds});
        }
    });
});


// adding a post to allow a user to add a campgrounds

app.post("/campgrounds", (req, res)=>{
    //get a data from a form

    let campName = req.body.campName;
    let campUrl = req.body.campUrl;
    let campDescription = req.body.description;

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

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
	if(err){
	    console.log(err);
	}else{
    res.render("comments/new", {campground: campground});
	}
    });
});


app.post("/campgrounds/:id/comments", isLoggedIn, (req,res)=>{
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



// Authentication Routes

//Registration route
app.get("/register", (req, res)=>{
    res.render("register");
});

app.post("/register", (req, res)=>{
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/campgrounds");
        });
    });
});

// Login routes

app.get("/login", (req, res)=>{
    res.render("login");
});


app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res)=>{});

// logout route

app.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/");
});


//function to check login state

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//route for page not found
    app.get("*", (req, res)=>{
        res.send("Page not found");
    });


    app.listen(3000, ()=>{
        console.log("Server has Started");
    });
