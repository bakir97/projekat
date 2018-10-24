import {
  GET_ONE_TRACK,
  GET_ONE_TRACK_ERROR
} from "../../../redux/consts/consts";
import oneTrackReducer from "../../../redux/reducers/oneTrackReducer";
describe("oneTrackReducer", () => {
  it("should return initialState", () => {
    expect(oneTrackReducer(undefined, {})).toEqual({
      track: {},
      error: false
    });
  });
  it("should return track", () => {
    const action = {
      type: GET_ONE_TRACK,
      payload: { name: "SongName" }
    };
    expect(oneTrackReducer(undefined, action)).toEqual({
      track: action.payload,
      error: false
    });
  });
  it("should return error", () => {
    const action = {
      type: GET_ONE_TRACK_ERROR,
      payload: true
    };
    expect(oneTrackReducer(undefined, action)).toEqual({
      track: {},
      error: true
    });
  });
});
