import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import employees from "./employees";
import feedbacks from "./feedbacks";
import { LOGOUT, AUTH_ERROR } from "../actions/types";

const appReducer = combineReducers({
  alert,
  auth,
  employees,
  feedbacks,
});

export default (state, action) => {
  const { type } = action;
  if (type === LOGOUT || type === AUTH_ERROR) {
    state = undefined;
  }
  return appReducer(state, action);
};
