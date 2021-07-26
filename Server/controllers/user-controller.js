const User = require("../models/user")
const HttpError = require("../models/http-error")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");


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
      const err = new HttpError("Invalid credentials, logging in failed", 401);
      return next(err);
    }

    let validPassword = await bcrypt.compare(password, existingUser.password);

    if(!validPassword){
      const err = new HttpError("Invalid credentials, logging in failed", 401);
      return next(err);
    }

    let token = jwt.sign(existingUser.toJSON(), process.env.JWT_KEY, { expiresIn: "24h" });

    res.status(201).json({ user: existingUser.toJSON(), token });

  } catch (error) {
    console.log(error);
    const err = new HttpError("Logging in failed, please try again later.", 500);
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

    const { name, username, password } = req.body;

    let existingUser = await User.findOne({ username });
    if (existingUser) {
      const err = new HttpError("Couldn't register user as another user with same username already exists", 409);
      return next(err);
    }

    // Hash password and save user

    let hashedPass = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    // Add avatar with media manager here if needed

    const newUser = new User({
      name,
      username,
      password: hashedPass,
      wallet: 5000,
      frozenWallet: 0,
      bets: [],
      rooms: [],
    });

    await newUser.save();

    let token = jwt.sign(newUser.toJSON(), process.env.JWT_KEY, { expiresIn: "24h" });

    res.status(201).json({ user: newUser.toJSON(), token });



  } catch (error) {
    console.log(error);
    const err = new HttpError("Registering failed, please try again later.", 500);
    return next(err);
  }
    


};


// These are being used for auth testing, please remove later

const secure = (req, res, next) => {

  console.log("Secure route");
  res.send({route:"Secure",data:req.userData});

};

const notSecure = (req, res, next) => {

  console.log("Not secure route");
  res.send({ route: "Not secure", data: req.userData });

};


exports.login = login;
exports.register = register;
exports.notSecure = notSecure;
exports.secure = secure;