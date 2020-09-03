const mongoose = require('mongoose');

const URI = "mongodb+srv://ich-mael:polipoli1234@cluster0.eak3i.azure.mongodb.net/yelpcampdb?retryWrites=true&w=majority";
connectDB = async()=>{
await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
console.log("Connected to DB");
}


module.exports = connectDB;

    