if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Required node modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const app = express();

// bring in the app constants
const { DB, PORT, SECRET } = require("./config");


// connecting to the database
const connectDB = async () => {
    try {
        await mongoose
            .connect(DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: true,
                useUnifiedTopology: true })
            .then(() => console.log('Database Connected'));
    } catch (err) {
        console.log(err);
        connectDB();
    }
};

connectDB();

// setting up ejs-mate
app.engine('ejs', ejsMate);

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parsing the body
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));



// home route
app.get('/', (req, res)=>{
    res.render('home');
});

// Campgrounds route
app.get('/campgrounds', async(req, res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});

// form for adding a new campground
app.get('/campgrounds/new', (req, res)=>{
    res.render('campgrounds/new');
});

// adding new campground
app.post('/campgrounds', async(req, res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});
// campground show route
app.get('/campgrounds/:id', async(req, res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
});

// editing campground
app.get('/campgrounds/:id/edit', async(req, res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
});

//put route
app.put('/campgrounds/:id', async (req,res)=>{
    const {id}= req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

// delete route

app.delete('/campgrounds/:id', async(req, res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});


app.listen(PORT, ()=> console.log('Server has started'));
