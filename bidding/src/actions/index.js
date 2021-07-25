import {
  GETBETS,
  ASCSORT,
  DSCSORT,
  SEARCH,
  SIGNIN,
  SIGNUP,
  SIGNOUT,
} from "./types";
import { allBets } from "../util/bets";
import { sortProperty } from "../services/sortype";
export const getBets = () => {
  //fetch all
  return {
    type: GETBETS,
    payload: allBets,
  };
};

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

//=====================USER ACTIONS ====================
export const signIn = (formVals) => {
  let user = { userName: "Abel", Id: "123123", bets: [1, 2, 4], wallet: 20 };
  //make api call to get user
  return {
    type: SIGNIN,
    payload: user,
  };
};
export const signUp = (formVals) => {
  let user = { userName: "Abel", Id: "123123", bets: [1, 2, 4], wallet: 20 };
  //make api call to get user
  return {
    type: SIGNUP,
    payload: user,
  };
};
export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};
