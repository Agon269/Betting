const { Router } = require("express")
const { check } = require("express-validator");
const authenCheck = require("../middlewares/check-auth")
const roomController = require("../controllers/room-controller")

const router = Router()


// Route to get all rooms

router.get("/", roomController.allRooms)

// Route to get a room
router.get("/:id", roomController.roomById)


module.exports = router