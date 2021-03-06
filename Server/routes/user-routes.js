const {Router} = require("express")
const { check } = require("express-validator");
const authenCheck = require("../middlewares/check-auth")
const userController = require("../controllers/user-controller")

const router = Router()


// Authentication routes


router.post(
  "/register",
  [check("username").not().isEmpty(),  check("password").isLength({ min: 8, max: 16 })],
  userController.register
);


router.post("/login", [check("username").not().isEmpty(), check("password").not().isEmpty()], userController.login);


// Route to get user data
router.get("/", authenCheck, userController.getUser);


// Route to get user data
router.get("/userdata", authenCheck, userController.getUserData);



module.exports = router
