import axios from "axios";
import md5 from "blueimp-md5";
import { TRACK_LOVE_ERROR } from "../consts/consts";
export const trackLove = (
  track,
  artist,
  username,
  password
) => async dispatch => {
  try {
    const apiKey = "7f71277355ae0a3c0d8856731bd5b5d1";
    const apiSignature = md5(
      `api_key7f71277355ae0a3c0d8856731bd5b5d1methodauth.getMobileSessionpassword${password}username${username}51361bf89af24e76f65a98bc935d0cc9`
    );

    const skKeyRequest = await axios.post(
      `https://ws.audioscrobbler.com/2.0/?method=auth.getMobileSession&api_key=${apiKey}&password=${password}&username=${username}&api_sig=${apiSignature}
      &format=json`
    );
    const details = {
      artist: artist,
      track: track,
      api_key: apiKey,
      api_sig: apiSignature,
      sk: skKeyRequest.data.session.key,
      method: "track.love"
    };
    //
    await axios.post("http://ws.audioscrobbler.com/2.0/", details);
    //problem je ovdje dobijam Invalid parameters - Your request is missing a required parameter
    //
  } catch (error) {
    dispatch(trackLoveError(true));
  }
};
export const trackLoveError = error => ({
  type: TRACK_LOVE_ERROR,
  payload: error
});
