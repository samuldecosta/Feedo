import axios from "axios";
import { setAlert } from "./alert";
import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Register Employee
export const register = ({
  name,
  password,
  email,
  designation,
  bio,
  domain,
}) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    name,
    password,
    email,
    designation,
    bio,
    domain,
  });
  try {
    await axios.post("api/employees", body, config);
    dispatch(setAlert(`Employee Registeration success`, "success"));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//load current logged in user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Employee Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    password,
    email,
  });
  try {
    const res = await axios.post("api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
