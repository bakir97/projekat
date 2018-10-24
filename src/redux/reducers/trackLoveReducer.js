import { TRACK_LOVE_ERROR } from "../consts/consts";
const initialState = {
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRACK_LOVE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
