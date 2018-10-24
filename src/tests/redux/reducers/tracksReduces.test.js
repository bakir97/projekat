import { TRACKS_ERROR, GET_TRACKS } from "../../../redux/consts/consts";
import tracksReducer from "../../../redux/reducers/tracksReducer";
describe("tracksReducer", () => {
  it("should return initialState", () => {
    expect(tracksReducer(undefined, {})).toEqual({ tracks: {}, error: false });
  });
  it("should return tracks", () => {
    const action = {
      type: GET_TRACKS,
      payload: { track: [{ name: "TrackName" }] }
    };
    expect(tracksReducer(undefined, action)).toEqual({
      tracks: action.payload,
      error: false
    });
  });
  it("should return error", () => {
    const action = {
      type: TRACKS_ERROR,
      payload: true
    };
    expect(tracksReducer(undefined, action)).toEqual({
      error: true,
      tracks: {}
    });
  });
});
