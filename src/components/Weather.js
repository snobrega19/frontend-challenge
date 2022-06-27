import { useState, useEffect, useCallback } from "react";
import "./Weather.css";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;
const apiKey = "32e6a9e3a7ab0fc0b70086d0b3990a44";
const units = "metric";
const exclude = "minutely, hourly, alerts";
function Weather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentWeather, setcurrentWeather] = useState(null);
  const [weekWeather, setWeekWeather] = useState(null);

  const getCurrentLocation = (position) => {
    if (position && position.coords.latitude && position.coords.longitude) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } else {
      setLatitude(defaultLatitude);
      setLongitude(defaultLongitude);
    }
  };

  const getCurrentWeather = useCallback(async () => {
    if (latitude && longitude) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
      );

      if (!response.ok) {
        throw new Error("Error while trying to get current weather");
      }

      const data = await response.json();
      setcurrentWeather(data);
    }
  }, [latitude, longitude]);

  const getWeekForecast = useCallback(async () => {
    if (latitude && longitude) {
      const weekResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&exclude=${exclude}`
      );

      if (!weekResponse.ok) {
        throw new Error("Error while trying to get week forecast");
      }

      const weekData = await weekResponse.json();
      setWeekWeather(weekData);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
    getCurrentWeather();
    getWeekForecast().catch((error) => {
      throw new Error(error.message);
    });
  }, [getCurrentWeather, getWeekForecast]);

  return (
    <div>
      {currentWeather && (
        <div className="app">
          <div className="currentWeather">
            <p>{currentWeather.name}</p>
            <div className="currentTemp">
              <p>{Math.ceil(currentWeather.main.temp)}&deg;</p>
              <img
                src={`https://api.openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
                alt="weather icon"
              />
            </div>
          </div>
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
          {/* <div className="weekForecast">
          <div>
            <p>1</p>
            <p>2</p>
          </div>
          <div>
            <p>1</p>
            <p>2</p>
          </div>
          <div>
            <p>1</p>
            <p>2</p>
          </div>
        </div> */}
        </div>
      )}
    </div>
  );
}

export default Weather;
