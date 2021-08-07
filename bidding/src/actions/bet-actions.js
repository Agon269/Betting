import {
  GETBETS,
  GETUSERBETS,
  GETBET,
  CREATEBET,
  EDITBET,
  CREATESUBBET,
} from "./types";
import { allBets } from "../util/bets";
import betty from "../api/betty";
import { success, failed } from "./alert-actions";
import history from "../history";
export const getUserBets = (token) => {
  //make api call
  return {
    type: GETUSERBETS,
    payload: allBets,
  };
};
export const getBets = () => async (dispatch) => {
  try {
    let res = await betty.get("/bets/");

    dispatch({ type: GETBETS, payload: res.data.bets });
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};

export const getBet = (id) => async (dispatch) => {
  //check some tuts whether you should make an api call or not
  try {
    let res = await betty.get(`/bets/bet/${id}`);

    dispatch({ type: GETBET, payload: res.data.bet });
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};

export const createBet = (formValues) => async (dispatch) => {
  formValues.side = true;
  try {
    let res = await betty.post("/bets/createbet", { ...formValues });

    dispatch({ type: CREATEBET, payload: res.data });
    dispatch(success("Successfully Created bet"));

    history.push(`/bet/${res.data.bet.id}`);
    //programatic routing to bet page
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};
export const matchBet = (id) => async (dispatch) => {
  try {
    await betty.post(`/bets/matchbet/${id}`);
    dispatch(success("Successfully Matched bet"));
    //should route to where
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};

export const editBet = (id, changes) => async (dispatch) => {
  console.log(id, changes);
  try {
    let res = await betty.put(`/bets/bet/${id}`, { ...changes });
    dispatch({ type: EDITBET, payload: res.data });
    history.push(`/bet/${res.data.id}`);
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};

export const createSubBet = (id, formVals) => async (dispatch) => {
  if (formVals.side === "For") formVals.side = true;
  else if (formVals.side === "Against") formVals.side = false;
  try {
    let res = await betty.post(`/bets/createSubBet/${id}`, { ...formVals });
    dispatch(success("Successfully Created a Sub bet"));
    dispatch({ type: CREATESUBBET, payload: res.data.subBet });
    history.push(`/bet/${res.data.subBet.id}`);
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};
