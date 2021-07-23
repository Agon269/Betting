import { GETBETS, ASCSORT, DSCSORT, SEARCH } from "./types";
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
    payload: text,
  };
};
