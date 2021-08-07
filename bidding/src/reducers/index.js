<<<<<<< HEAD
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { alertReducer } from "./alertReducer";
import betReducer from "./betReducer";
import userReducer from "./userReducer";
export default combineReducers({
  bets: betReducer,
  user: userReducer,
  form: formReducer,
  alert: alertReducer,
});
=======
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { alertReducer } from "./alertReducer";
import betReducer from "./betReducer";
import userReducer from "./userReducer";

export default combineReducers({
  bets: betReducer,
  user: userReducer,
  form: formReducer,
  alert: alertReducer,
});
>>>>>>> 5371e86812dc8cb538a93cb460c5a97fe1e22ee1
