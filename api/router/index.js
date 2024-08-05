const express = require("express");
const router = express.Router();

const airbnbController = require("../airbnb/airbnb.controller")

router.route("/airbnb")
    .get(airbnbController.getAll)

router.route("/airbnb/geoSearch")
    .get(airbnbController.geoSearch)

router.route("/airbnb/:id")
    .get(airbnbController.getOne)
    .delete(airbnbController.deleteOne)

module.exports = router;