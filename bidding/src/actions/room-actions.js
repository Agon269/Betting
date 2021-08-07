import betty from "../api/betty";
import { failed } from "./alert-actions";
import { GETROOM, GETROOMS } from "./types";

export const getRooms = () => async (dispatch) => {
  try {
    let res = await betty.get("/rooms/allrooms");

    dispatch({ type: GETROOMS, payload: res.data.rooms });
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};

export const getRoom = (id) => async (dispatch) => {
  try {
    let res = await betty.get(`/rooms/room/${id}`);

    dispatch({ type: GETROOM, payload: res.data.room });
  } catch (err) {
    if (err.response) dispatch(failed(err.response.data));
    else {
      dispatch(failed("Something went wrong"));
    }
  }
};
