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
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
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
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&exclude=${exclude}`
      );

      if (!weekResponse.ok) {
        throw new Error("Error while trying to get week forecast");
      }

      const weekData = await weekResponse.json();
      setWeekWeather(weekData.daily.slice(0, -1));
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
        <div>
          <div className="currentWeather">
            <p>{currentWeather.name}</p>
            <div>
              <p>{currentWeather.main.temp}</p>
              <img
                src={`https://api.openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
                alt="weather icon"
              />
            </div>
          </div>
          {weekWeather &&
            weekWeather.map((week) => (
              <div key={week.dt} className="weekForecast">
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

export default Weather;
