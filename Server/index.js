// Imports
// NPM
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
// Routes
const userRoutes = require("./routes/user-routes")
const betRoutes = require("./routes/bet-routes")
const roomRoutes = require("./routes/room-routes")
// Models
const HttpError = require("./models/http-error")



const app = express()


// Middlewares 
app.use(cors())
app.use(express.json())


// Add the routes
app.use("/api/users",userRoutes);
app.use("/api/bets", betRoutes);
app.use("/api/rooms", roomRoutes);


// Error for non-existing route
app.use((req, res, next) => {
  const error = new HttpError("This route doesn't exist.", 404);
  throw error;
});



// Middlware for error handling
app.use((err,req,res,next)=>{
    if(res.headerSent){
        return next(err)
    }
    res.status(err.code || 500)
    res.json({message:err.message || "Oops, an unknown error occured."})
})


mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@biddingappcluster1.7i0ko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });


