import { GET_COUNTRIES, COUNTRIES_ERROR } from "../consts/consts";
const initialState = {
  countries: [],
  error: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countries: action.payload };
    case COUNTRIES_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
