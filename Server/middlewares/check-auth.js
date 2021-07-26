const jwt = require("jsonwebtoken")
const HttpError = require("../models/http-error")

const checkAuth = (req,res,next)=>{

    try {
        if (req.headers.authorization){
                const token = req.headers.authorization.split(" ")[1];
                if (!token) {
                const err = new HttpError("User not authenticated", 401);
                return next(err);
                } else {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decodedToken;
                next();
                }
        }else{
            const err = new HttpError("User not authenticated", 401);
            return next(err);
        }
        
        

    } catch (error) {
        const err = new HttpError("Authentication failed.");
        return next(err);
    }


}

module.exports = checkAuth