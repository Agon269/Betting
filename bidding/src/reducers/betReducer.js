import { GETBETS, GETBET, CREATEBET, CREATESUBBET } from "../actions/types";

import _ from "lodash";

const betReducer = (state = {}, action) => {
  switch (action.type) {
    case GETBETS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case CREATEBET:
      return { ...state, [action.payload.id]: action.payload };
    case GETBET:
      return { ...state, [action.payload.id]: action.payload };
    case CREATESUBBET:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
export default betReducer;
