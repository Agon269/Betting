import { SIGNIN, SIGNUP, SIGNOUT, GETUSER } from "./types";
import betty from "../api/betty";
import authHeaqder from "../services/auth-header";

export const signIn = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/user/login/`, { ...formVals });
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    authHeaqder(token);
    dispatch({ type: SIGNIN, payload: res.data });
  } catch (err) {
    //create an error message
    console.log(err);
    // dispatch({ type: GET_ERROR, payload: err });
  }
};
export const signUp = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/user/register/`, { ...formVals });
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    authHeaqder(token);
    dispatch({ type: SIGNUP, payload: res.data });
  } catch (err) {
    //create an error message
    console.log(err);
    // dispatch({ type: GET_ERROR, payload: err });
  }
};

export const getUser = (token) => {
  let user = localStorage.getItem("user");

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
