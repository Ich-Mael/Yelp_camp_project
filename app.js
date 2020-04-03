//jshint esversion: 6

const app = (require("express"))();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let camps=[
    {name: "Namek",
     image: "https://media.gettyimages.com/photos/birthday-party-picture-id1035763336?s=2048x2048"},
    {name: "Ecuomondo",
     image: "https://media.gettyimages.com/photos/children-having-fun-in-ropes-course-adventure-park-picture-id689947182?s=2048x2048"},
    {name: "Marine Ford",
     image: "https://media.gettyimages.com/photos/group-of-kids-in-a-tugofwar-game-picture-id498425450?s=2048x2048"}
];


// home route
app.get("/", (req, res)=>{
    res.render("home");
});

//campgrounds route
app.get("/campgrounds", (req, res)=>{
      //rendering the campgrounds page
    res.render("campgrounds", {camps: camps});
});


// adding a post to allow a user to add a campgrounds

app.post("/campgrounds", (req, res)=>{
    //get a data from a form
    let CampName = req.body.campName;
    let campUrl = req.body.campUrl;
    let newCampground = {name: CampName, image: campUrl};
    camps.push(newCampground);

    // redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res)=>{
    res.render("new");

});
app.get("*", (req, res)=>{
    res.send("Page not found");
});


app.listen(3000, ()=>{
    console.log("Server has Started");
});
