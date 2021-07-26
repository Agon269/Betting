import {
  GETBETS,
  ASCSORT,
  DSCSORT,
  SEARCH,
  SIGNIN,
  SIGNUP,
  SIGNOUT,
  GETUSER,
  GETUSERBETS,
  GETBET,
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
    payload: text,
  };
};

//=====================AUTH ACTIONS ====================
export const signIn = (formVals) => {
  console.log(formVals);
  console.log("here in signin");
  let user = { userName: "Abel", Id: "123123", bets: [1, 2, 4], wallet: 20 };
  //make api call to get user
  return {
    type: SIGNIN,
    payload: user,
  };
};
export const signUp = (formVals) => {
  console.log(formVals);
  console.log("here in signup");
  let user = { userName: "Abel", Id: "123123", bets: [1, 2, 4], wallet: 20 };
  //make api call to get user
  return {
    type: SIGNUP,
    payload: user,
  };
};

export const getUser = (token) => {
  let user = { userName: "Abel", Id: "123123", bets: [1, 2, 4], wallet: 20 };
  //make api call
  return {
    type: GETUSER,
    payload: user,
  };
};
export const signOut = () => {
  return {
    type: SIGNOUT,
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
