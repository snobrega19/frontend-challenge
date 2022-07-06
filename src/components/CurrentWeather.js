import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";
import "./CurrentWeather.css";
import { getWeekDayAndTime } from "../utils/date-functions";
import { weatherActions } from "store/weather-slice";
import useCurrentPosition from "hooks/useCurrentPosition";
import { statusActions } from "store/status-slice";
import { getCurrentWeatherEndpoint } from "../utils/request-configs";

const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;

function CurrentWeather() {
  const dispatch = useDispatch();
  const { makeRequest: getCurrentWeather } = useHttp();
  const city = useSelector((state) => state.cities.city);
  const currentWeather = useSelector((state) => state.weather.currentWeather);
  const loadCurrentWeather = useSelector(
    (state) => state.loading.loadCurrentWeather
  );
  const coordinates = useSelector((state) => state.coordinates);
  useCurrentPosition(); //gets current longitude and latitude and sets values

  useEffect(() => {
    getCurrentWeather(
      getCurrentWeatherEndpoint(city, loadCurrentWeather, {
        latitude: coordinates.latitude ?? defaultLatitude,
        longitude: coordinates.longitude ?? defaultLongitude,
      })
    )
      .then((res) => {
        dispatch(weatherActions.setCurrentWeather(res));
        dispatch(
          statusActions.setSuccessMessage(
            "Get current weather for this location with success."
          )
        );
      })
      .catch(() => {
        dispatch(
          statusActions.setErrorMessage(
            "Fail to get current weather for this location."
          )
        );
      });
  }, [coordinates]);

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
