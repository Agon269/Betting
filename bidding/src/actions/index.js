import { GETBETS, GETUSERBETS, GETBET } from "./types";
import { allBets } from "../util/bets";

//================================== BET ACTIONS ===========================
export const getUserBets = (token) => {
  //make api call
  return {
    type: GETUSERBETS,
    payload: allBets,
  };
};
export const getBets = () => {
  //fetch all
  return {
    type: GETBETS,
    payload: allBets,
  };
};

export const getBet = () => {
  //check some tuts whether you should make an api call or not

  return {
    type: GETBET,
    payload: allBets[0],
  };
};
