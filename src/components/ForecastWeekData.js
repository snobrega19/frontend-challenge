import { useState, useEffect, useCallback } from "react";
import "./ForecastWeekData.css";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;
const apiKey = "32e6a9e3a7ab0fc0b70086d0b3990a44";
const units = "metric";
const exclude = "minutely, hourly, alerts";
function ForecastWeekData() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weekWeather, setWeekWeather] = useState(null);

  const getCurrentLocation = (position) => {
    if (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } else {
      setLatitude(defaultLatitude);
      setLongitude(defaultLongitude);
    }
  };

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
    getWeekForecast().catch((error) => {
      throw new Error(error.message);
    });
  }, [getWeekForecast]);

  return (
    <div>
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
