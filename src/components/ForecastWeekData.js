import useCurrentPosition from "hooks/useCurrentPosition";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { weekDay } from "utils/date-functions";
import { getWeekWeatherEndpoint } from "../utils/request-configs";
import { statusActions } from "store/status-slice";
import { weatherActions } from "store/weather-slice";
import "./ForecastWeekData.css";
import { defaultLatitude, defaultLongitude } from "../utils/constants";

function ForecastWeekData() {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.weather.coordinates);
  const { data: weekWeather, loadForecastData } = useSelector(
    (state) => state.weather.weekWeather
  );

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
