import { DISMISS, FAILED, SUCCESS } from "../actions/types";

export const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case SUCCESS:
      let message = action.message;
      return { type: "success", message, dismiss: false };
    case FAILED:
      return { type: "error", ...action.message, dismiss: false };
    case DISMISS:
      return { ...state, dismiss: true };
    default:
      return state;
  }
};
