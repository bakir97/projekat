import axios from "axios";
import { GET_TRACKS, TRACKS_ERROR, NO_DATA } from "../consts/consts";
export const getTracks = (country, page) => async dispatch => {
  try {
    const tracks = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=7f71277355ae0a3c0d8856731bd5b5d1&page=${page}&limit=20&format=json`
    );
    if (tracks.data.tracks.track.length === 0) {
      return dispatch(noData(true));
    }
    dispatch(tracksToRedux(tracks.data));
  } catch (error) {
    dispatch(tracksError(true));
  }
};
export const tracksToRedux = tracks => ({
  type: GET_TRACKS,
  payload: tracks
});
export const tracksError = error => ({
  type: TRACKS_ERROR,
  payload: error
});
export const noData = data => ({
  type: NO_DATA,
  payload: data
});
