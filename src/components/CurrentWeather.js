import { useState, useEffect, useCallback } from "react";
import "./CurrentWeather.css";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;
const apiKey = "32e6a9e3a7ab0fc0b70086d0b3990a44";
const units = "metric";
function CurrentWeather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentWeather, setcurrentWeather] = useState(null);

  const getCurrentLocation = (position) => {
    if (position) {
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
    getCurrentWeather();
  }, [getCurrentWeather]);

  return (
    <div>
      {currentWeather && (
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
      )}
    </div>
  );
}

export default CurrentWeather;
