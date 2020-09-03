const mongoose = require('mongoose');
require('dotenv/config');

connectDB = async()=>{
mongoose
     .connect(process.env.DB_connection_secret, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
}

module.exports = connectDB;

    