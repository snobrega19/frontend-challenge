import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CurrentWeather.css";
import { getWeekDayAndTime } from "../utils/date-functions";
import { weatherActions } from "store/weather-slice";
import useCurrentPosition from "hooks/useCurrentPosition";
import { statusActions } from "store/status-slice";
import { getCurrentWeatherEndpoint } from "../utils/request-configs";
import { defaultLatitude, defaultLongitude } from "../utils/constants";
import fetchAPI from "utils/fetch-api";
import { useQuery } from "react-query";

function CurrentWeather() {
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.weather);
  const { data: currentWeather } = useSelector(
    (state) => state.weather.currentWeather
  );
  const coordinates = useSelector((state) => state.weather.coordinates);
  useCurrentPosition(); //gets current longitude and latitude and sets values

  const {
    data: dataResponse,
    isLoading,
    refetch,
  } = useQuery(
    "currentWeather",
    () =>
      fetchAPI(
        getCurrentWeatherEndpoint(city, {
          latitude: coordinates.latitude ?? defaultLatitude,
          longitude: coordinates.longitude ?? defaultLongitude,
        })
      ),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        dispatch(
          statusActions.setErrorMessage(
            "Fail to get current weather for this location."
          )
        );
      },
      onSuccess: (data) => {
        dispatch(weatherActions.setCurrentWeather(data));
        dispatch(
          statusActions.setSuccessMessage(
            "Get current weather for this location with success."
          )
        );
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [dataResponse, coordinates, city]);

  return (
    <div className="currentWeather-div">
      {currentWeather && (
        <div className="currentWeather">
          <div className="currentTemp">
            <img
              src={`https://api.openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p className="temperature">
              {Math.ceil(currentWeather.main.temp)}&deg;
            </p>
          </div>
          <div className="city-name">
            <p className="right">{currentWeather.name}</p>
            <p>{getWeekDayAndTime(currentWeather.dt)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
