const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

// Update left - Password length, username/email? 

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    wallet: {
      type: Number,
      required: true,
    },
    frozenWallet: {
      type: Number,
      required: true,
    },
    bets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Bet",
      },
    ],
    rooms: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema)