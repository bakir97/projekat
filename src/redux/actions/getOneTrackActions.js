import axios from "axios";
import { GET_ONE_TRACK, GET_ONE_TRACK_ERROR } from "../consts/consts";
export const getTrack = (artist, song) => async dispatch => {
  try {
    const track = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=7f71277355ae0a3c0d8856731bd5b5d1&artist=${artist}&track=${song}&format=json`
    );
    dispatch(trackToRedux(track.data));
  } catch (error) {
    dispatch(trackError(true));
  }
};
export const trackToRedux = track => ({
  type: GET_ONE_TRACK,
  payload: track
});
export const trackError = error => ({
  type: GET_ONE_TRACK_ERROR,
  payload: error
});
