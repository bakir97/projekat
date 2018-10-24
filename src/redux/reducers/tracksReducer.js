import { GET_TRACKS, TRACKS_ERROR, NO_DATA } from "../consts/consts";
const initialState = {
  tracks: {},
  error: false,
  noData: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRACKS:
      return { ...state, tracks: action.payload };
    case TRACKS_ERROR:
      return { ...state, error: action.payload };
    case NO_DATA:
      return { ...state, noData: action.payload };
    default:
      return state;
  }
};
