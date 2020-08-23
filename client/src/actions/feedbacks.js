import axios from "axios";
import { setAlert } from "./alert";
import { SAVE_FEEDBACK_REQUESTS } from "./types";
import setAuthToken from "../utils/setAuthToken";

// fetch all Employees List
export const getFeedbackRequests = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/feedbackrequests");
    dispatch({
      type: SAVE_FEEDBACK_REQUESTS,
      payload: res.data,
    });
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
