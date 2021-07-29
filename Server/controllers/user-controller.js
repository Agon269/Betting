const User = require("../models/user")
const HttpError = require("../models/http-error")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");
const MYCONSTANTS = require("../constants")


const login = async(req,res,next)=>{

  try {
    // Validate input data

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new HttpError("Invalid credentials passed, please check your credentials.", 422);
      return next(err);
    }

    // Authenticate user

    const { username, password } = req.body;

    let existingUser = await User.findOne({username})
    if(!existingUser){
      const err = new HttpError("Wrong credentials, logging in failed", 401);
      return next(err);
    }

    let validPassword = await bcrypt.compare(password, existingUser.password);

    if(!validPassword){
      const err = new HttpError("Wrong credentials, logging in failed", 401);
      return next(err);
    }

    let token = jwt.sign(existingUser.toJSON(), process.env.JWT_KEY, { expiresIn: "24h" });

    res.status(200).json({ user: existingUser.toJSON(), token });

  } catch (error) {
    const err = new HttpError("Logging in failed due to internal server issue, please try again later.", 500);
    return next(err);
  }

}


const register = async (req, res, next) => {

  try {
    // Validate input data

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new HttpError("Invalid credentials passed, please check your credentials.", 422);
      return next(err);
    }

    
    // check if user with same username exists or no


    const { username, password } = req.body;


    let existingUser = await User.findOne({ username });
    if (existingUser) {
      const err = new HttpError("Couldn't register user as another user with same username already exists", 409);
      return next(err);
    }

    // Hash password and save user

    let hashedPass = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    // Add avatar with media manager here if needed

    const newUser = new User({
      username,
      password: hashedPass,
      wallet: MYCONSTANTS.WALLET_INIT,
      frozenWallet: 0,
      bets: [],
      rooms: [],
    });

    await newUser.save();

    let token = jwt.sign(newUser.toJSON(), process.env.JWT_KEY, { expiresIn: "24h" });

    res.status(201).json({ user: newUser.toJSON(), token });



  } catch (error) {
    const err = new HttpError("Registering failed due to internal server issue, please try again later.", 500);
    return next(err);
  }
    


};

// get current user for jwt
const getUser = async (req,res,next)=>{

  try {
    const user = req.userData
    res.status(200).json({ user: user })
  } catch (error) {
    const err = new HttpError("Internal server issue, please try again later.", 500);
    return next(err);
  }
  
  
}




// get current user from DB using jwt
const getUserData = async (req, res, next) => {

  try {
    const user = await User.findById(req.userData.id)
    res.status(200).json({ user: user })
  } catch (error) {
    const err = new HttpError("Internal server issue, please try again later.", 500);
    return next(err);
  }

}





exports.login = login;
exports.register = register;
exports.getUser = getUser;
exports.getUserData = getUserData;
