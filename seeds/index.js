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

// connecting to the database
const connectDB = async () => {
    try {
        await mongoose
            .connect(process.env.APP_DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true })
            .then(() => console.log('Database Connected'));
        //app.listen(PORT, () => console.log('Server has started'));
    } catch (err) {
        console.log(err);
        connectDB();
    }
};

connectDB();

const sample = array => array[Math.floor(Math.random()*array.length)];
// seed data in the DB
const seedDb = async()=> {
    await campground.deleteMany({}); 

    for(let i = 0; i < 50 ; i++){
        const rand1000 = Math.floor(Math.random()*1000)+1 ;
        const newCamp = new campground({
            title:`${sample(descriptors)} ${sample(places)}`, 
            location: `${cities[rand1000].city}-${cities[rand1000].state}`
        });
// Saving data to the DB
        await newCamp.save();
    }
};

seedDb().then(()=>{
    mongoose.connection.close();
});
