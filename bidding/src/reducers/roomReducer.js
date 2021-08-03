import { GETROOMS, ASCSORT, DSCSORT, SEARCH } from "../actions/types";
import _ from "lodash";
import { mySort } from "../services/sort";
import { search } from "../services/search";
let sortedBets;
export const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case GETROOMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case ASCSORT:
      sortedBets = mySort(state, action.payload);
      return { ...sortedBets };
    case DSCSORT:
      sortedBets = mySort(state, action.payload, "descending");
      return { ...sortedBets };
    case SEARCH:
      return search(state, action.payload);
    default:
      return state;
  }
};
