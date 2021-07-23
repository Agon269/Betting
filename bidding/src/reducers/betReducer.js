import { GETBETS, ASCSORT, DSCSORT } from "../actions/types";
import { mySort } from "../services/sort";
let sortedBets;
const betReducer = (state = [], action) => {
  switch (action.type) {
    case GETBETS:
      return [...state, ...action.payload];
    case ASCSORT:
      sortedBets = mySort(state, action.payload);
      return [...sortedBets];
    case DSCSORT:
      sortedBets = mySort(state, action.payload, "descending");
      return [...sortedBets];
    default:
      return state;
  }
};
export default betReducer;
