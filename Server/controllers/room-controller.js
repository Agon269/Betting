const HttpError = require("../models/http-error")
const Room = require("../models/room")
const User = require("../models/user")
const Bet = require("../models/bet")
const ObjectId = require('mongoose').Types.ObjectId
const mongoose = require("mongoose")
const { validationResult } = require("express-validator");

// Function for getting all rooms

const allRooms = async (req, res, next) => {

    try {

        const rooms = await Room.find({}).populate({path:"bets",populate:{path:"bettor"}}).populate("owner")

        res.send({ rooms })


    } catch (error) {
        const err = new HttpError("Getting rooms failed due to internal server issue, please try again later.", 500);
        return next(err);
    }

}

// Function for getting valid rooms

const openRooms = async (req, res, next) => {

    try {

        const rooms = await Room.find({ winner: { $exists: false}}).populate({path:"bets",populate:{path:"bettor"}}).populate("owner")

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
            return next(new HttpError("The room with the id doesn't exist.", 404));
        }
        const room = await Room.findById(req.params.id).populate({path:"bets",populate:{path:"bettor"}}).populate("owner")
        if (!room) {
            return next(new HttpError("The room with the id doesn't exist.", 404));
        }
        res.send({ room })
    } catch (error) {
        const err = new HttpError("Getting a room failed due to internal server issue, please try again later.", 500);
        return next(err);
    }

}


// Function for deciding winner

const decideWinner = async(req,res,next)=>{


    try {
      // Input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let msg = "Invalid data: ";
        msg += errors
          .array()
          .map((er) => `${er.param}`)
          .join(", ");

        return next(new HttpError(msg, 422));
      }

      if (!ObjectId.isValid(req.params.id)) {
        return next(new HttpError("The room with the id doesn't exist.", 404));
      }
      const room = await Room.findById(req.params.id);
      const user = await User.findById(req.userData.id);
      const {winner} = req.body

      if (!room) {
        return next(new HttpError("The room with the id doesn't exist.", 404));
      }

      if (!(room.owner.toString() === user.id.toString())) {
        return next(new HttpError("Unauthorized request made.", 401));
    }
    
    if(room.winner!==undefined){
        return next(new HttpError("Unauthorized request made, the room's winner is already decided.", 401));

      }
      // Get all the bets of this room populated with the users
      const roomBets = await Bet.find({ room: room.id }).populate("bettor");

      const sess = await mongoose.startSession();
      sess.startTransaction();

      // For each bet in the room, update the bets and their bettor by-
      // 1. If they are on winning side remove bet amount from frozen and add to wallet 2x amount
      // 2. If they are on the losing side remove bet amount from frozen

      for(i=0;i<roomBets.length;i++){
          const curBet = roomBets[i]
          if (!curBet.resolved) {
              if (curBet.side === winner) {
                // winner
                curBet.resolved = true;
                curBet.bettor.wallet += 2 * curBet.amountBet;
                curBet.bettor.frozenWallet -= curBet.amountBet;
              } else {
                // loser
                curBet.resolved = true;
                curBet.bettor.frozenWallet -= curBet.amountBet;
              }
              await curBet.save({session:sess})
              await curBet.bettor.save({session:sess})
          }
          
      }

      room.winner = winner
      await room.save()
      sess.commitTransaction();
      const updatedRoom = await Room.findById(req.params.id);
      res.send({ room: updatedRoom.toJSON() });
    } catch (error) {
        console.log(error);
        const err = new HttpError("Couldn't decide and confirm winner due to internal server issue, please try again later.", 500);
        return next(err);
        
    }
  
}

exports.allRooms = allRooms
exports.openRooms = openRooms
exports.roomById = roomById
exports.decideWinner = decideWinner;
