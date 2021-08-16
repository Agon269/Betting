const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    searchKey: {
      type: String,
    },
    // Creator of the room
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    startTime: {
      type: Date,
      required: true,
    },
    // End time of the bet set by the owner
    endTime: {
      type: Date,
      required: true,
    },
    // Winner set by the owner after the end time
    winner: {
      type: Boolean,
    },
    // Bets placed in the room
    bets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Bet",
      },
    ],
    // People who placed bets including the owner
    bettors: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    // Category of the room to use for searching
    category: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Room", roomSchema);
