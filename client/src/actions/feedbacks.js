import axios from "axios";
import { setAlert } from "./alert";
import {
  SAVE_FEEDBACK_REQUESTS,
  SAVE_FEEDBACK_LIST,
  REMOVE_FEEDBACK,
  UPDATE_FEEDBACK,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// fetch all feedback request List
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
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
  }
};

// Request a feedbacck
export const requestFeedBack = ({ reqby, reqfrom, reqfor }) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({ reqby, reqfrom, reqfor });
  try {
    const res = await axios.post("api/feedbackrequests", body);
    if (res.data.success) {
      dispatch(setAlert("Feedback request generated", "success"));
    }
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
  }
};

// fetch all feedback List
export const getFeedbackList = (empId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`api/feedback/${empId}`);
    dispatch({
      type: SAVE_FEEDBACK_LIST,
      payload: res.data,
    });
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
  }
};

// Submit feedback
export const submitFeedback = (
  summary,
  employee,
  feedbackId = "",
  reqId = "",
  overAllPerformance = 0
) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({
    reqId,
    feedbackId,
    employee,
    summary,
    overAllPerformance,
  });
  try {
    const res = await axios.post(`api/feedback`, body);
    dispatch({
      type: SAVE_FEEDBACK_LIST,
      payload: res.data,
    });
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
  }
};
// remove  feedback
export const removeFeedback = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({
    id,
  });
  console.log(id);
  try {
    const res = await axios({
      method: "DELETE",
      url: "api/feedback",
      data: body,
      headers: { "Content-Type": "application/json" },
    });
    if (res.data.success) {
      dispatch({
        type: REMOVE_FEEDBACK,
        payload: id,
      });
      return dispatch(setAlert(`Feedback removed`, "success"));
    } else return dispatch(setAlert(`Feedback Not removed`, "danger"));
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
  }
};
