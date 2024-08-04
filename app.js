require("dotenv").config()
require("./api/data/db")
const express = require("express");
const router = require("./api/router");
const app = express();

const _env = process.env;

app.listen(_env.PORT);

app.use("/api", router)

console.log("Server is listening at http://localhost:" + _env.PORT)