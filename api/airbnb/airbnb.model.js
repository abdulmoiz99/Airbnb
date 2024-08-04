const mongoose = require("mongoose");
const _env = process.env

const airbnbSchema = mongoose.Schema({
    name: String
})

mongoose.model(_env.AIRBNB_MODEL, airbnbSchema, _env.AIRBNB_COLLECTION)