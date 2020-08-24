import axios from "axios";
import { setAlert } from "./alert";
import {
  SAVE_EMP_LIST,
  SET_UPDATE_EMP_DATA,
  SET_UPDATE_EMP_ID,
  SET_FEEDBACK_EMP_ID,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// fetch all Employees List
export const getEmployeesList = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/employees");
    dispatch({
      type: SAVE_EMP_LIST,
      payload: res.data.employees,
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
//Set UserId in redux to see feedback of that user
export const setEmpForFeedback = (id) => (dispatch) => {
  dispatch({
    type: SET_FEEDBACK_EMP_ID,
    payload: id,
  });
};
//Set UserId in redux to make update on that user
export const setUserForUpdate = (id) => (dispatch) => {
  dispatch({
    type: SET_UPDATE_EMP_ID,
    payload: id,
  });
};
// Update Employee Data
export const updateEmployee = ({
  name,
  email,
  designation,
  bio,
  domain,
  giveAdminRight,
  revokeAdminRight,
}) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = {
    name,
    email,
    designation,
    bio,
    domain,
    giveAdminRight,
    revokeAdminRight,
  };
  try {
    const res = await axios.post("api/employees/update", body);
    dispatch({
      type: SET_UPDATE_EMP_DATA,
      payload: res.data,
    });
    dispatch(setAlert("Employee data updated", "success"));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// delete Employee
export const removeEmployee = (employeeId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({
    employeeId,
  });
  try {
    const res = await axios({
      method: "DELETE",
      url: "api/employees",
      data: body,
      headers: { "Content-Type": "application/json" },
    });
    dispatch({
      type: SAVE_EMP_LIST,
      payload: res.data.employees,
    });
    dispatch(setAlert(`Employee remover with id ${employeeId}`, "success"));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
