import {
  GETBETS,
  ASCSORT,
  DSCSORT,
  SEARCH,
  GETUSERBETS,
  GETBET,
} from "./types";
import { allBets } from "../util/bets";
import { sortProperty } from "../services/sortype";
import betty from "../api/betty";
import authHeaqder from "../services/auth-header";

export const getBets = () => async (dispatch) => {
  //fetch all

  return {
    type: GETBETS,
    payload: allBets,
  };
};
//======================SORTING ===============================
export const ascSort = (sortBy) => {
  let sorterProperty = sortProperty(sortBy);
  return {
    type: ASCSORT,
    payload: sorterProperty,
  };
};

export const dscSort = (sortBy) => {
  let sorterProperty = sortProperty(sortBy);

  return {
    type: DSCSORT,
    payload: sorterProperty,
  };
};

export const search = (text) => {
  //you should fetch all before searching
  //payload should consist of all data and text field
  return {
    type: SEARCH,
    payload: { text, allBets },
  };
};

//================================== USER ACTIONS ===========================
export const getUserBets = (token) => {
  //make api call
  return {
    type: GETUSERBETS,
    payload: allBets,
  };
};

export const getBet = () => {
  return {
    type: GETBET,
    payload: allBets[0],
  };
};
