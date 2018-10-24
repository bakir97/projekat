import { GET_COUNTRIES, COUNTRIES_ERROR } from "../../../redux/consts/consts";
import CountryReducer from "../../../redux/reducers/countriesReducer";
describe("CountryReducer", () => {
  it("should return initialState", () => {
    expect(CountryReducer(undefined, {})).toEqual({
      countries: [],
      error: false
    });
  });
  it("should return countries", () => {
    const action = {
      type: GET_COUNTRIES,
      payload: [{ name: "Bosna i Hercegovina" }, { name: "Argentina" }]
    };
    expect(CountryReducer(undefined, action)).toEqual({
      error: false,
      countries: action.payload
    });
  });
  it("should return error", () => {
    const action = {
      type: COUNTRIES_ERROR,
      payload: true
    };
    expect(CountryReducer(undefined, action)).toEqual({
      countries: [],
      error: true
    });
  });
});
