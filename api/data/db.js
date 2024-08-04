const mongoose = require("mongoose");
require("../airbnb/airbnb.model")
const _env = process.env

mongoose.connect(_env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected")
})
