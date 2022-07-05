import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";
import "./CurrentWeather.css";
import StatusBar from "./UI/StatusBar";
import { getWeekDayAndTime } from "../utils/date-functions";
import { weatherActions } from "store/weather-slice";
import useCurrentPosition from "hooks/useCurrentPosition";

const userWeather = () => {
  const { makeRequest: getCurrentWeather } = useHttp();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  return {
    showSuccess,
    showError,
    error,
    successMessage,
    getCurrentWeather,
  };
};

function CurrentWeather() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.cities.city);
  const loadCurrentWeather = useSelector(
    (state) => state.loading.loadCurrentWeather
  );
  const { latitude, longitude } = useSelector((state) => state.coordinates);
  const { currentWeather } = useSelector(
    (state) => state.weather.currentWeather
  );
  const { showSuccess, showError, error, successMessage, getCurrentWeather } =
    userWeather();

  useCurrentPosition();

  const getRequestConfig = useCallback(() => {
    let endpoint;
    if (city && loadCurrentWeather) {
      endpoint = `weather?q=${city}`;
    } else if (latitude && longitude) {
      endpoint = `weather?lat=${latitude}&lon=${longitude}`;
    }
    return endpoint;
  }, [city, loadCurrentWeather, latitude, longitude]);

  const closeSuccessModal = () => {
    setShowSuccess(false);
  };

  const closeErrorModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    getCurrentWeather(getRequestConfig())
      .then((res) => {
        console.log(res);
        dispatch(weatherActions.setCurrentWeather(res));
        // setShowSuccess(true);
        // setShowError(false);
        // setSuccessMessage(
        //   "Getted current weather for the selected location with success."
        // );
      })
      .catch(() => {
        // setShowError(true);
        // setShowSuccess(false);
        // setError("Fail to get current weather for the selected location.");
      });
  }, [getCurrentWeather, getRequestConfig]);

  return (
    <div className="currentWeather-div">
      {/* {showSuccess && (
        <div>
          <StatusBar
            onClose={setTimeout(() => closeSuccessModal(), 3000)}
            variant="success"
            message={successMessage}
          />
        </div>
      )}
      {showError && (
        <div>
          <StatusBar
            onClose={setTimeout(() => closeErrorModal(), 3000)}
            variant="danger"
            message={error}
          />
        </div>
      )} */}
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
