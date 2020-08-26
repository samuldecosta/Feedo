import { SET_ALERT, REMOVE_ALERT, SET_LOADER } from "../actions/types";

const initialState = { alertList: [], loader: true };
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { ...state, alertList: [...state.alertList, payload] };
    case REMOVE_ALERT:
      return {
        ...state,
        alertList: [...state.alertList.filter((alert) => alert.id !== payload)],
      };
    case SET_LOADER:
      return { ...state, loader: payload };
    default:
      return state;
  }
}
