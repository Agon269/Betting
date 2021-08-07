import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { alertReducer } from "./alertReducer";
import betReducer from "./betReducer";
import { roomReducer } from "./roomReducer";
import userReducer from "./userReducer";

export default combineReducers({
  bets: betReducer,
  user: userReducer,
  form: formReducer,
  alert: alertReducer,
  room: roomReducer,
});
