if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Required node modules
const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

// bring in the app constants
const { DB, PORT, SECRET } = require("../config");
console.log(process.env);
// connecting to the database
const connectDB = async () => {
    try {
        await mongoose
            .connect("mongodb+srv://mael:yelpcampproject@cluster0.grzuv.mongodb.net/yelpcampDB?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true })
            .then(() => console.log('Database Connected'));
    } catch (err) {
        console.log(err);
        // connectDB();
    }
};

connectDB();

const sample = array => array[Math.floor(Math.random()*array.length)];

// seed data in the DB
const seedDb = async()=> {
    await campground.deleteMany({});

    for(let i = 0; i < 50 ; i++){
        const rand1000 = Math.floor(Math.random()*1000)+1 ;
        const price = Math.floor(Math.random()*50)+10;
        const newCamp = new campground({
            title:`${sample(descriptors)} ${sample(places)}`, 
            location: `${cities[rand1000].city}-${cities[rand1000].state}`,
            image: `https://source.unsplash.com/collection/483251`,
            description: "This is a lovely place to Camp.",
            price
        });

// Saving data to the DB
        await newCamp.save();
    }
};

seedDb().then(()=>{
    mongoose.connection.close();
});
