const Room = require("../models/room")
const HttpError = require("../models/http-error");


const getUUID = async (uuidFunc, trycount) => {
  if (trycount > 0) {
    trycount--;
    const UUID = uuidFunc();
    const existing = await Room.findOne({ searchKey: UUID });
    if (!existing) {
        
      return UUID;
    } else {
      return getUUID(uuidFunc, trycount);
    }
  } else {
    throw new HttpError("Couldn't generate unique search key. Maximum recursive tries failed.");
  }
};

module.exports = getUUID;
