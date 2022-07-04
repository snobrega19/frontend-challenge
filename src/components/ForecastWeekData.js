import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import "./ForecastWeekData.css";
import StatusBar from "./UI/StatusBar";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;
const apiKey = "0e66409d2818073f5e8fd1d76d8a718d";
const units = "metric";
const exclude = "minutely, hourly, alerts";
function ForecastWeekData() {
  const searchLatitude = useSelector((state) => state.forecast.latitude);
  const searchLongitude = useSelector((state) => state.forecast.longitude);
  const loadForecastData = useSelector(
    (state) => state.loading.loadForecastData
  );
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weekWeather, setWeekWeather] = useState(null);
  const { isLoading, makeRequest: getWeekForecast } = useHttp();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const getRequestConfig = useCallback(() => {
    let requestConfig;
    if (searchLatitude && searchLongitude && loadForecastData) {
      requestConfig = {
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${searchLatitude}&lon=${searchLongitude}&appid=${apiKey}&units=${units}&exclude=${exclude}`,
      };
    } else if (latitude && longitude) {
      requestConfig = {
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&exclude=${exclude}`,
      };
    }
    return requestConfig;
  }, [searchLatitude, searchLongitude, loadForecastData, latitude, longitude]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    getWeekForecast(getRequestConfig())
      .then((res) => {
        setWeekWeather(res);
        setShowSuccess(true);
        setShowError(false);
        setSuccessMessage(
          "Getted forecast data for the next 7 days to the selected location with success."
        );
      })
      .catch(() => {
        setShowError(true);
        setShowSuccess(false);
        setError(
          "Fail to get forecast data for the next 7 days to the selected location."
        );
      });
  }, [getWeekForecast, getRequestConfig]);

  return (
    <div>
      {showSuccess && (
        <StatusBar
          onClose={() => setShowSuccess(false)}
          variant="success"
          message={successMessage}
        />
      )}
      {showError && (
        <StatusBar
          onClose={() => setShowError(false)}
          variant="danger"
          message={error}
        />
      )}
      {weekWeather && (
        <div className="weekForecast">
          {weekWeather.daily.map((week) => (
            <div key={week.dt} className="dayForecast">
              <p>
                {new Date(week.dt * 1000).toLocaleString("en-us", {
                  weekday: "long",
                })}
              </p>
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
