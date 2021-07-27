const {Router} = require("express")
const authenCheck = require("../middlewares/check-auth");
const {check} = require("express-validator")
const betController = require("../controllers/bet-controller")
const MYCONSTANTS = require("../constants")

const route = Router()


route.post(
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

route.post("/matchbet/:betID", authenCheck, betController.matchBet)

route.post(
  "/createSubBet/:roomID",
  authenCheck,
  [
    check("amount").isFloat({ min: MYCONSTANTS.MIN_BID_AMOUNT, max: MYCONSTANTS.MAX_BID_AMOUNT }),
    check("side").isBoolean(),
  ],
  betController.createSubBet
);

route.put("/:id", authenCheck, [
  check("amount").isFloat({ min: MYCONSTANTS.MIN_BID_AMOUNT, max: MYCONSTANTS.MAX_BID_AMOUNT }),
  check("side").isBoolean(),
], betController.editBet)

route.delete("/:id", authenCheck, betController.deleteBet)


module.exports = route