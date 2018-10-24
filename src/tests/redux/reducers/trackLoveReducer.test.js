import { TRACK_LOVE_ERROR } from "../../../redux/consts/consts";
import trackLoveReducer from "../../../redux/reducers/trackLoveReducer";
describe("trackLoveReducer", () => {
  it("should return initialState", () => {
    expect(trackLoveReducer(undefined, {})).toEqual({ error: false });
  });
  it("should return error", () => {
    const action = {
      type: TRACK_LOVE_ERROR,
      payload: true
    };
    expect(trackLoveReducer(undefined, action)).toEqual({ error: true });
  });
});
