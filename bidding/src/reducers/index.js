import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import betReducer from "./betReducer";
import userReducer from "./userReducer";
export default combineReducers({
  bets: betReducer,
  user: userReducer,
  form: formReducer,
});
