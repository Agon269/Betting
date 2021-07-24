const {Router} = require("express")
const authenCheck = require("../middlewares/check-auth");
const {check} = require("express-validator")
const betController = require("../controllers/bet-controller")

const route = Router()


route.post(
  "/createbet",
  authenCheck,
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 100, max: 400 }),
    check("category").not().isEmpty(),
    check("enddate").isAfter(),
    check("amount").isFloat({ min: 0, max: 500 }),
    check("side").isBoolean(),
  ],
  betController.createBet
);

route.post("/matchbet/:betID", authenCheck, betController.matchBet)

route.post(
  "/createSubBet/:roomID",
  authenCheck,
  [
    check("amount").isFloat({ min: 0, max: 500 }),
    check("side").isBoolean(),
  ],
  betController.createSubBet
);


module.exports = route