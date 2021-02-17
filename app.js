if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Required node modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const app = express();

// bring in the app constants
const { DB, PORT, SECRET } = require("./config");


// connecting to the database
const connectDB = async () => {
    try {
        await mongoose
            .connect(process.env.APP_DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true })
            .then(() => console.log('Database Connected'));
    } catch (err) {
        console.log(err);
        connectDB();
    }
};

connectDB();

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// home route
app.get('/', (req, res)=>{
    res.render('home');
});

// Campgrounds route
app.get('/campgrounds', async(req, res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});


















app.listen(PORT, ()=> console.log('Server has started'));
