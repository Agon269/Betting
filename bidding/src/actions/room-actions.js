import betty from "../api/betty";
import { failed } from "./alert-actions";
import { GETROOMS } from "./types";

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
