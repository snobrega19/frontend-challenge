import useCurrentPosition from "hooks/useCurrentPosition";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { weekDay } from "utils/date-functions";
import useHttp from "../hooks/use-http";
import { getWeekWeatherEndpoint } from "../utils/request-configs";
import { statusActions } from "store/status-slice";
import { weatherActions } from "store/weather-slice";
import "./ForecastWeekData.css";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;

function ForecastWeekData() {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.coordinates);
  const loadForecastData = useSelector(
    (state) => state.loading.loadForecastData
  );
  const weekWeather = useSelector((state) => state.weather.weekWeather);
  const { makeRequest: getWeekForecast } = useHttp();

  useCurrentPosition();

  useEffect(() => {
    getWeekForecast(
      getWeekWeatherEndpoint(
        {
          latitude: coordinates.latitude ?? defaultLatitude,
          longitude: coordinates.longitude ?? defaultLongitude,
        },
        loadForecastData
      )
    )
      .then((res) => {
        dispatch(weatherActions.setWeekWeather(res));
        dispatch(
          statusActions.setSuccessMessage(
            "Get forecast data for the next 7 days for this location with success."
          )
        );
      })
      .catch(() => {
        dispatch(
          statusActions.setErrorMessage(
            "Fail to get forecast data for this location."
          )
        );
      });
  }, [coordinates]);

  return (
    <div className="forecast-data">
      {weekWeather && (
        <div className="weekForecast">
          {weekWeather.daily.map((week) => (
            <div key={week.dt} className="dayForecast">
              <p>{weekDay(week.dt)}</p>
              <img
                src={`https://api.openweathermap.org/img/w/${week.weather[0].icon}.png`}
                alt="weather icon"
              />
              <div className="temperatures">
                <p className="maxTemp">{Math.ceil(week.temp.max)}&deg;</p>
                <p>{Math.ceil(week.temp.min)}&deg;</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForecastWeekData;
