import axios from "axios";
import { GET_COUNTRIES, COUNTRIES_ERROR } from "../consts/consts";
import { AsyncStorage } from "react-native";
export const getCountries = () => async dispatch => {
  try {
    const countries = await axios.get("https://restcountries.eu/rest/v2/all");

    dispatch(getCountriesToRedux(countries.data));
    AsyncStorage.setItem("countries", JSON.stringify(countries.data));
  } catch (error) {
    dispatch(countriesError(true));
  }
};
export const getCountriesToRedux = countries => ({
  type: GET_COUNTRIES,
  payload: countries
});
export const countriesError = error => ({
  type: COUNTRIES_ERROR,
  payload: error
});
