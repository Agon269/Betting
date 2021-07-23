import { GETBETS, ASCSORT, DSCSORT, SEARCH } from "../actions/types";
import { mySort } from "../services/sort";
import { search } from "../services/search";

let sortedBets;
const betReducer = (state = [], action) => {
  switch (action.type) {
    case GETBETS:
      return [...action.payload];
    case ASCSORT:
      sortedBets = mySort(state, action.payload);
      return [...sortedBets];
    case DSCSORT:
      sortedBets = mySort(state, action.payload, "descending");
      return [...sortedBets];
    case SEARCH:
      return search(action.payload.allBets, action.payload.text);
    default:
      return state;
  }
};
export default betReducer;
