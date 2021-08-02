const { Router } = require("express")
const { check } = require("express-validator");
const authenCheck = require("../middlewares/check-auth")
const roomController = require("../controllers/room-controller")

const router = Router()



// Route to get all rooms

router.get("/allrooms", roomController.allRooms)


// Route to get all open rooms

router.get("/openrooms", roomController.openRooms)

// Route to get a room
router.get("/room/:id", roomController.roomById)

// Route to get a room
router.put("/decidewinner/:id", authenCheck, check("winner").isBoolean(), roomController.decideWinner)


module.exports = router