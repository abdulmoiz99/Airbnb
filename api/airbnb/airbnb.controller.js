
const mongoose = require("mongoose");
const _env = process.env
const Airbnb = mongoose.model(_env.AIRBNB_MODEL)

const _response = {
    status: 200,
    data: {
        totalCount: "",
        airbnb: ""
    }
}
const _getAllValidation = function (req) {
    return new Promise((resolve, rejects) => {
        let offset = 0;
        let limit = 5;

        const maxLimit = 50;

        if (req.query && req.query.offset) {
            if (isNaN(req.query.offset)) rejects("Offset should be a number.")
            offset = parseInt(req.query.offset, 10);
        }
        if (req.query && req.query.limit) {
            if (isNaN(req.query.limit)) rejects("Limit should be a number.")
            limit = parseInt(req.query.limit, 10);
        }

        if (limit > maxLimit) rejects("Limit should be less than 50.")

        if (offset < 0) rejects("Offset should greater than 0.")

        resolve({ offset, limit });
    })
}
const _setResponseToBadRequest = function (_response, error) {
    _response.status = 400;
    _response.data = error
}
const _setResponseToInternalServerError = function (_response, error) {
    console.log(error);
    _response.status = 500;
    _response.data = "Internal Server Error."
}
const getAll = function (req, res) {
    console.log("getAll Controller")

    _getAllValidation(req)
        .then(({ offset, limit }) => { return Airbnb.find().skip(offset).limit(limit).exec() })
        .catch(error => _setResponseToBadRequest(_response, error))
        .then(airbnb => {
            _response.data.airbnb = airbnb
            return Airbnb.countDocuments();
        })
        .then(count => _response.data.totalCount = count)
        .catch(error => _setResponseToInternalServerError(_response, error))
        .finally(_ => _sendResponse(res, _response))
}

const _validateObjectId = function (id) {
    return new Promise((resolve, rejects) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            rejects("Please provide a valid object Id.");
        } else {
            resolve(id);
        }
    });
};
const _sendResponse = function (res, _response) {
    res.status(_response.status).json(_response.data)
}
const getOne = function (req, res) {
    _response.status = 200;
    console.log("getOne Controller")
    const id = req.params.id
    _validateObjectId(id)
        .then((id) => { return Airbnb.findById(id) })
        .catch(_ => { _setResponseToBadRequest(_response, error) })
        .then(airbnb => _response.data = airbnb)
        .catch(error => _setResponseToInternalServerError(_response, error))
        .finally(_ => _sendResponse(res, _response))
}

const deleteOne = function (req, res) {
    _response.status = 200;
    console.log("deleteOne controller")
    const id = req.params.id
    _validateObjectId(id)
        .then((id) => { return Airbnb.deleteOne({ _id: id }) })
        .catch(error => _setResponseToBadRequest(_response, error))
        .then(airbnb => _response.data = airbnb)
        .catch(error => _setResponseToInternalServerError(_response, error))
        .finally(_ => _sendResponse(res, _response))
}
module.exports = {
    getAll,
    getOne,
    deleteOne,
}