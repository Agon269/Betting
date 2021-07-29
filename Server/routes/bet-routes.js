const {Router} = require("express")
const authenCheck = require("../middlewares/check-auth");
const {check} = require("express-validator")
const betController = require("../controllers/bet-controller")
const MYCONSTANTS = require("../constants")

const router = Router()


// Route to get all bets
router.get("/", betController.allBets)

// Route to get a bet
router.get("/bet/:id", betController.aBet)




// Route to create a new room with bet
router.post(
  "/createbet",
  authenCheck,
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: MYCONSTANTS.MIN_ROOM_DESCRIPTION_LENGTH, max: MYCONSTANTS.MAX_ROOM_DESCRIPTION_LENGTH }),
    check("category").not().isEmpty(),
    check("enddate").isAfter(),
    check("amount").isFloat({ min: MYCONSTANTS.MIN_BID_AMOUNT, max: MYCONSTANTS.MAX_BID_AMOUNT }),
    check("side").isBoolean(),
  ],
  betController.createBet
);


// Route to match a bet
router.post("/matchbet/:betID", authenCheck, betController.matchBet)

// Route to create a sub-bet in a room
router.post(
  "/createSubBet/:roomID",
  authenCheck,
  [
    check("amount").isFloat({ min: MYCONSTANTS.MIN_BID_AMOUNT, max: MYCONSTANTS.MAX_BID_AMOUNT }),
    check("side").isBoolean(),
  ],
  betController.createSubBet
);


// Route to edit a bet in a room
router.put("/bet/:id", authenCheck, [
  check("amount").isFloat({ min: MYCONSTANTS.MIN_BID_AMOUNT, max: MYCONSTANTS.MAX_BID_AMOUNT }),
  check("side").isBoolean(),
], betController.editBet)


// Route to delete a bet

router.delete("/bet/:id", authenCheck, betController.deleteBet)


module.exports = router