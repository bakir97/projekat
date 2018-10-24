import { GET_ONE_TRACK, GET_ONE_TRACK_ERROR } from "../consts/consts";
const initialState = {
  track: {},
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_TRACK:
      return { ...state, track: action.payload };
    case GET_ONE_TRACK_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
