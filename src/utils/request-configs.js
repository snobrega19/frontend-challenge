const exclude = "minutely, hourly, alerts";
export const getCurrentWeatherEndpoint = (
  city,
  loadCurrentWeather,
  coordinates = {}
) => {
  let endpoint;
  if (city && loadCurrentWeather) {
    endpoint = `weather?q=${city}`;
  } else if (coordinates) {
    endpoint = `weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  }
  return endpoint;
};

export const getWeekWeatherEndpoint = (coordinates = {}) => {
  let endpoint;
  if (coordinates) {
    endpoint = `onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=${exclude}`;
  }
  console.log(endpoint);
  return endpoint;
};

export function getFindEndpoint(city) {
  let endpoint = null;
  if (city) {
    endpoint = `find?q=${city}`;
  }
  return endpoint;
}
