import { SIGNOUT, GETUSER } from "./types";
import betty from "../api/betty";

export const signIn = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/user/login`, { ...formVals });
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    dispatch(getUser(token));
  } catch (err) {
    //create an error message
    console.log(err);
    // dispatch({ type: GET_ERROR, payload: err });
  }
};
export const signUp = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/user/register`, { ...formVals });
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);

    dispatch(getUser(token));
  } catch (err) {
    //create an error message
    console.log(err);
    // dispatch({ type: GET_ERROR, payload: err });
  }
};

//decode json web token

export const getUser = (token) => async (dispatch) => {
  let res;
  try {
    res = await betty.get(`/user/`);
    dispatch({ type: GETUSER, payload: res.data.user });
  } catch (err) {
    //create an error message
    console.log(err);
    // dispatch({ type: GET_ERROR, payload: err });
  }
};
export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};
