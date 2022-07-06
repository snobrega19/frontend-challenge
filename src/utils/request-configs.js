export const getCurrentWeatherEndpoint = (
  city,
  loadCurrentWeather,
  coordinates = {}
) => {
  let endpoint;
  if (city && loadCurrentWeather) {
    endpoint = `weather?q=${city}`;
  } else {
    endpoint = `weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  }
  return endpoint;
};
