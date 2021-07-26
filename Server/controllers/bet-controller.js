const {validationResult} = require("express-validator")
const mongoose = require("mongoose")
const nanoid = require("nanoid");
const getUUID = require("../utilities/uuid-generator");
const HttpError = require("../models/http-error")
const User = require("../models/user")
const Bet = require("../models/bet")
const Room = require("../models/room")

// Function for creating a bet
const createBet = async (req,res,next)=>{

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

      const user = await User.findById(req.userData.id);
      const { title, description, category, enddate, amount, side } = req.body;
      if (user.wallet - amount < 0) {
        return next(new HttpError("The bet amount placed is more than that available in your wallet.", 422));
      }

      // Create room

      const newRoom = new Room({
        title,
        description,
        owner: user.id,
        startTime: new Date(),
        endTime: new Date(enddate),
        bets: [],
        bettors: [user.id],
        category: [category],
        searchKey:"temp"
      });

      // Save the room
      await newRoom.save();

      // Create bet
      const newBet = new Bet({
        bettor: user.id,
        amountBet: amount,
        mutable: true,
        resolved: false,
        room: newRoom.id,
        side: side,
        createdTime:new Date()
      });

      // Assign bet to room
      // Generate UUID and assign to room
      const uuidFunc = await nanoid.customAlphabet(newRoom.id.toString(), 6)
      const uuid = await getUUID(uuidFunc, 10);
      newRoom.bets.push(newBet);
      newRoom.searchKey = uuid;
      // Assign net and room to user + move the bet amount from wallet to
      // frozenWallet

      user.bets.push(newBet);
      user.rooms.push(newRoom);

      user.wallet -= amount;
      user.frozenWallet += amount;

      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newRoom.save({ session: sess });
        await newBet.save({ session: sess });
        await user.save({ session: sess });
        sess.commitTransaction();
      } catch (e) {
        console.log(e);
        const err = new HttpError("Creating bet failed, please try again.", 500);
        return next(err);
      }

      // Return room/bet

      res.send(newRoom.toJSON());
    } catch (error) {

        console.log(error);
        const err = new HttpError("Creating bet failed, please try again later.", 500);
        return next(err);
    }
    
}


// Function for matching a bet (Going against an existing bet)
const matchBet = async (req,res,next)=>{
  try {
    // matchedBetID
    const matchedBetID = req.params.betID;
    const matchedBet = await Bet.findById(matchedBetID);
    const user = await User.findById(req.userData.id);
    // If matchedBet not found
    if (!matchedBet) {
      return next(new HttpError("The bet to be matched doesn't exist.", 422));
    }

    // =========== Validation of Bets before matching

    // Check if user not the same person on the opposing bet
    if (matchedBet.bettor.toString() === user.id.toString()) {
      return next(new HttpError("You cannot bet against your own bet.", 422));
    }
    if (user.wallet - matchedBet.amountBet < 0) {
      // Check if users wallet have enough money
      return next(new HttpError("The bet amount placed is more than that available in your wallet.", 422));
    }
    // Check if Bet already matched or no
    if (matchedBet.opposingBet) {
      return next(new HttpError("Another bet has already matched this bet, please try other bets.", 422));
    }
    // Get Bet room and check if room is still open for bets
    const room = await Room.findById(matchedBet.room);
    if (!(room.endTime.valueOf() > new Date().valueOf()) || room.winner != undefined) {
      return next(new HttpError("The time has ended for betting in this room.", 422));
    }

    //create a bet for the user to match bet

    const newBet = new Bet({
      bettor: user.id,
      amountBet: matchedBet.amountBet,
      mutable: false,
      resolved: false,
      room: room.id,
      side: !matchedBet.side,
      opposingBet: matchedBet.id,
      createdTime: new Date(),
    });

    await newBet.save();

    //update the matched bet with the new bet and vice-versa
    // turn both bets immutable.
    matchedBet.opposingBet = newBet.id;
    matchedBet.mutable = false;

    // update the user with the amount (wallet to frozen) and bet created.
    user.bets.push(newBet);

    // Assign room to user
    if (!user.rooms.includes(room.id)) {
      user.rooms.push(room.id);
    }

    user.wallet -= matchedBet.amountBet;
    user.frozenWallet += matchedBet.amountBet;

    // update the room with the new bet and bettor
    room.bets.push(newBet);
    // Assign user to room
    if (!room.bettors.includes(user.id)) {
      room.bettors.push(user.id);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await matchedBet.save({ session: sess });
    await room.save({ session: sess });
    await user.save({ session: sess });
    sess.commitTransaction();

    res.send({ room: room.toJSON(), matchedBet: matchedBet.toJSON(), newBet: newBet.toJSON() });
  } catch (error) {
    console.log(error);
     const err = new HttpError("Matching bet failed, please try again.", 500);
     return next(err);
  }
  
}


const createSubBet = async (req,res,next)=>{
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

    const user = await User.findById(req.userData.id);
    const { amount, side } = req.body;
    if (user.wallet - amount < 0) {
      return next(new HttpError("The bet amount placed is more than that available in your wallet.", 422));
    }

    // Get Room
    const room = await Room.findById(req.params.roomID);

    if (!(room.endTime.valueOf() > new Date().valueOf()) || room.winner != undefined) {
      return next(
        new HttpError("The time has ended for betting in this room or a winner has already been decided.", 422)
      );
    }

    const newBet = new Bet({
      bettor: user.id,
      amountBet: amount,
      mutable: true,
      resolved: false,
      room: room.id,
      side: side,
      createdTime: new Date()
    });

    // Assign new bet to room
    room.bets.push(newBet);
    // Assign user to room
    if(!room.bettors.includes(user.id)){
      room.bettors.push(user.id);
    }

    // Assign bet to user and update users wallet
    user.bets.push(newBet);
    // Assign room to user
     if (!user.rooms.includes(room.id)) {
       user.rooms.push(room.id);
     }
    user.wallet -= amount;
    user.frozenWallet += amount;

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newBet.save({ session: sess });
    await room.save({ session: sess });
    await user.save({ session: sess });
    sess.commitTransaction();


    res.send(room.toJSON())

  } catch (error) {
    console.log(error);
    const err = new HttpError("Creating sub-bet failed, please try again later.", 500);
    return next(err);
  }
}





exports.createBet = createBet
exports.matchBet = matchBet;
exports.createSubBet = createSubBet;