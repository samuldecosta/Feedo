import { SAVE_FEEDBACK_REQUESTS } from "../actions/types";

const initialState = {
  feedbackRequests: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_FEEDBACK_REQUESTS:
      return { ...state, feedbackRequests: payload.openRequests };
    default:
      return state;
  }
}
