import { SIGNIN, SIGNOUT, SIGNUP } from "../actions/types";
const INTITAL_STATE = {
  isSignedIn: false,
  user: null,
};
const userReducer = (state = INTITAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGNIN:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGNOUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
};
export default userReducer;
