const HttpError = require("../models/http-error")
const Room = require("../models/room")
var ObjectId = require('mongoose').Types.ObjectId

// Function for getting all rooms

const allRooms = async (req, res, next) => {

    try {

        const rooms = await Room.find({}).populate("bets")

        res.send({ rooms })


    } catch (error) {
        const err = new HttpError("Getting rooms failed due to internal server issue, please try again later.", 500);
        return next(err);
    }

}

// Function for getting valid rooms

const openRooms = async (req, res, next) => {

    try {

        const rooms = await Room.find({ winner: { $exists: false}}).populate("bets")

        res.send({ rooms })


    } catch (error) {
        const err = new HttpError("Getting rooms failed due to internal server issue, please try again later.", 500);
        return next(err);
    }

}





// Function for getting a room

const roomById = async (req, res, next) => {

    try {

        if (!ObjectId.isValid(req.params.id)){
            return next(new HttpError("The room with the id doesn't exist.", 422))
        }
        const room = await Room.findById(req.params.id).populate("bets")
        if (!room) {
            return next(new HttpError("The room with the id doesn't exist.", 422))
        }
        res.send({ room })
    } catch (error) {
        const err = new HttpError("Getting a room failed due to internal server issue, please try again later.", 500);
        return next(err);
    }

}


exports.allRooms = allRooms
exports.openRooms = openRooms
exports.roomById = roomById