import { GETBETS, GETUSERBETS, GETBET, CREATEBET } from "./types";
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

    dispatch({ type: GETBETS, payload: res.data.bets.slice(140) });
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
    console.log(res.data.room.id);
    history.push(`/bet/${res.data.bet.id}`);
    //programatic routing to bet page
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};
