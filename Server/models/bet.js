const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const betSchema = new Schema(
  {
    // User placing the bet
    bettor: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // amount placed in bet
    amountBet: {
      type: Number,
      required: true,
    },
    // The bet opposing this bet if exists
    opposingBet: {
      type: mongoose.Types.ObjectId,
      ref: "Bet",
    },
    // The side of bet chosen
    side: {
      type: Boolean,
      required: true,
    },
    // mutable if the bet has not been matched yet
    mutable: {
      type: Boolean,
      required: true,
    },
    // resolved if winner decided and the bet amount has been transferred to the winner
    resolved: {
      type: Boolean,
      required: true,
    },
    // Parent room of this bet
    room: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    createdTime: {
      type: Date,
      required: true,
    },
    updatedTime: {
      type: Date,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Bet", betSchema);
