import { GETBETS, ASCSORT, DSCSORT, SEARCH, GETBET } from "../actions/types";
import { mySort } from "../services/sort";
import { search } from "../services/search";

let sortedBets;
const betReducer = (state = {}, action) => {
  switch (action.type) {
    case GETBETS:
      return { ...action.payload };
    case ASCSORT:
      sortedBets = mySort(state, action.payload);
      return { ...sortedBets };
    case DSCSORT:
      sortedBets = mySort(state, action.payload, "descending");
      return { ...sortedBets };
    case SEARCH:

      return search(state, action.payload);
    case GETBET:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
export default betReducer;
