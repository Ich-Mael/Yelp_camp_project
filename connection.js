const mongoose = require('mongoose');

const URI = "mongodb+srv://ich-mael:aJgQUqWD0PJgZ7fn@cluster0.eak3i.mongodb.net/yelpcampdb?retryWrites=true&w=majority";
connectDB = async()=>{
mongoose
     .connect( URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
}

module.exports = connectDB;

    