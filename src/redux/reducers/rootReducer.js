import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";
import tracksReduces from "./tracksReducer";
import oneTrackReducer from "./oneTrackReducer";
import trackLoveReducer from "./trackLoveReducer";

export default combineReducers({
  Countries: countriesReducer,
  Tracks: tracksReduces,
  Track: oneTrackReducer,
  trackLove: trackLoveReducer
});
