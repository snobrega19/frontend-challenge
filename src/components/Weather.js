import { useState, useEffect } from "react";
import "./Weather.css";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;
function Weather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      setLatitude(defaultLatitude);
      setLongitude(defaultLongitude);
    }
  }, []);

  return (
    <div>
      <p>Coordinates</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
}

export default Weather;
