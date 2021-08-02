const HttpError = require("../models/http-error");


const validateBetForEditAndDelete = async (user,bet,room)=>{
    if(!(bet.bettor.toString() === user.id.toString())){
        throw new HttpError("Unauthorized request made.",401)
    }
    if(!bet.mutable){
        throw new HttpError("The bet has been matched already, therefore requested action cannot be performed.", 401)
    }
    if (!(room.endTime.valueOf() > new Date().valueOf()) || room.winner != undefined) {
        throw new HttpError("The time has ended for editing bet in this room or a winner has already been decided.", 422)
    }

    return true
}


module.exports = validateBetForEditAndDelete