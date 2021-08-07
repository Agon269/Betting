<<<<<<< HEAD
import { SIGNOUT, GETUSER } from "./types";
import betty from "../api/betty";
import { success, failed } from "./alert-actions";
export const signIn = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/users/login`, { ...formVals });
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    dispatch(getUser(token));
    dispatch(success("Successfully signin in"));
  } catch (err) {
    //create an error message
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }

    // dispatch({ type: GET_ERROR, payload: err });
  }
};
export const signUp = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/users/register`, { ...formVals });
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
    res = await betty.get(`/users/`);

    dispatch({ type: GETUSER, payload: res.data.user });
  } catch (err) {
    //create an error message
    console.log(err);
    // dispatch({ type: GET_ERROR, payload: err });
  }
};
export const signOut = () => {
  localStorage.removeItem("jwtToken");
  return {
    type: SIGNOUT,
  };
};
=======
import { SIGNOUT, GETUSER } from "./types";
import betty from "../api/betty";
import { success, failed } from "./alert-actions";
export const signIn = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/users/login`, { ...formVals });
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    dispatch(getUser(token));
    dispatch(success("Successfully signed in"));
  } catch (err) {
    //create an error message
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }

    // dispatch({ type: GET_ERROR, payload: err });
  }
};
export const signUp = (formVals) => async (dispatch) => {
  let res;
  try {
    res = await betty.post(`/users/register`, { ...formVals });
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    dispatch(getUser(token));
    dispatch(success("Successfully Signed up in"));
  } catch (err) {
    //create an error message
    dispatch(failed("Something went wrong"));

    // dispatch({ type: GET_ERROR, payload: err });
  }
};

//decode json web token

export const getUser = (token) => async (dispatch) => {
  let res;
  try {
    res = await betty.get(`/users/`);

    dispatch({ type: GETUSER, payload: res.data.user });
  } catch (err) {
    //create an error message
    console.log(err);
    // dispatch({ type: GET_ERROR, payload: err });
  }
};
export const signOut = () => {
  localStorage.removeItem("jwtToken");
  return {
    type: SIGNOUT,
  };
};
>>>>>>> 5371e86812dc8cb538a93cb460c5a97fe1e22ee1
