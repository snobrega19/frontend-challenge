import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import "./CurrentWeather.css";
import StatusBar from "./UI/StatusBar";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;
const apiKey = "0e66409d2818073f5e8fd1d76d8a718d";
const units = "metric";
function CurrentWeather() {
  const city = useSelector((state) => state.weather.city);
  const loadCurrentWeather = useSelector(
    (state) => state.loading.loadCurrentWeather
  );
  const [latitude, setLatitude] = useState(defaultLatitude);
  const [longitude, setLongitude] = useState(defaultLongitude);
  const [currentWeather, setCurrentWeather] = useState(null);
  const { isLoading, makeRequest: getCurrentWeather } = useHttp();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const getRequestConfig = useCallback(() => {
    let requestConfig;
    if (city && loadCurrentWeather) {
      requestConfig = {
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`,
      };
    } else if (latitude && longitude) {
      requestConfig = {
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`,
      };
    }
    return requestConfig;
  }, [city, loadCurrentWeather, latitude, longitude]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    getCurrentWeather(getRequestConfig())
      .then((res) => {
        setCurrentWeather(res);
        setShowSuccess(true);
        setShowError(false);
        setSuccessMessage(
          "Getted current weather for the selected location with success."
        );
      })
      .catch(() => {
        setShowError(true);
        setShowSuccess(false);
        setError("Fail to get current weather for the selected location.");
      });
  }, [getCurrentWeather, getRequestConfig]);

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
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
