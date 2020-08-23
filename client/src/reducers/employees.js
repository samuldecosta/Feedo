import { SAVE_EMP_LIST } from "../actions/types";

const initialState = {
  employeesList: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_EMP_LIST:
      return { ...state, employeesList: payload };
    default:
      return state;
  }
}
