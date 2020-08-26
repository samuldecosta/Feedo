import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT, SET_LOADER } from "./types";

export const setAlert = (msg, alertType, timeOut = 3000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType },
  });
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, timeOut);
};
export const setLoader = (status) => (dispatch) => {
  dispatch({
    type: SET_LOADER,
    payload: status,
  });
};
