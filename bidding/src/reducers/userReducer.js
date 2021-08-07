import { SIGNOUT, GETUSER } from "../actions/types";

const INTITAL_STATE = {
  isSignedIn: false,
  currentUser: null,
};
const userReducer = (state = INTITAL_STATE, action) => {
  switch (action.type) {
    case SIGNOUT:
      return { ...state, isSignedIn: false, currentUser: null };
    case GETUSER:
      let user = { ...action.payload };
      return { ...state, isSignedIn: true, currentUser: user };
    default:
      return state;
  }
};
export default userReducer;
