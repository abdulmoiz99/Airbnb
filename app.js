require("dotenv").config()
require("./api/data/db")
const express = require("express");
const router = require("./api/router");
const app = express();

const _env = process.env;

app.listen(_env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
})

app.use("/api", router)




console.log("Server is listening at http://localhost:" + _env.PORT)