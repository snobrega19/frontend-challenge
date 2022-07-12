import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentWeatherEndpoint } from "../utils/request-configs";
import {
  defaultLatitude,
  defaultLongitude,
  apiURL,
  apiKey,
  units,
} from "../utils/constants";
import useCurrentPosition from "hooks/useCurrentPosition";
const useFetchCurrentWeather = async (
  city,
  loadCurrentWeather,
  coordinates
) => {
  const { defaultLatitude, defaultLongitude } = useCurrentPosition(); //gets current longitude and latitude
  const endpoint = getCurrentWeatherEndpoint(city, loadCurrentWeather, {
    latitude: coordinates.latitude ?? defaultLatitude,
    longitude: coordinates.longitude ?? defaultLongitude,
  });
  const res = await fetch(
    `${apiURL}/${endpoint}&appid=${apiKey}&units=${units}`
  );
  const data = await res.json();
  return data;
};

export default useFetchCurrentWeather;
