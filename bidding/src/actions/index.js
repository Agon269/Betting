import { GETBETS, ASCSORT, DSCSORT } from "./types";
import { allBets } from "../util/bets";
import { sortProperty } from "../services/sortype";
export const getBets = () => {
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
