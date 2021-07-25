import { combineReducers } from "redux";
import betReducer from "./betReducer";
import userReducer from "./userReducer";
export default combineReducers({
  bets: betReducer,
  user: userReducer,
});
