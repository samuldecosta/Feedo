import axios from "axios";
import { setAlert } from "./alert";
import { SAVE_EMP_LIST } from "./types";
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
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
