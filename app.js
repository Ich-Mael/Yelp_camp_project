            //jshint esversion: 6

            const app = (require("express"))();
            const bodyParser = require("body-parser");
            const mongoose = require('mongoose');
            mongoose.connect("mongodb://localhost/yelp-camp",{useNewUrlParser: true, useUnifiedTopology: true});

            app.use(bodyParser.urlencoded({extended: true}));
            app.set("view engine", "ejs");


                // setting the schema

                let campgroundSchema = new mongoose.Schema({
                name: String,
                image: String,
                description: String
                });

            let Campground = mongoose.model("campground", campgroundSchema);

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

                // route for more description

        app.get("/campgrounds/:id", (req, res)=>{
                     let id = req.params.id;
            Campground.findById(id, (err, foundCampground)=>{
                               if(err){
                                console.log(err);
                                }else{
                            res.render("description",{ campground: foundCampground});
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
