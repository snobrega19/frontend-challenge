import { apiKey, apiURL, units } from "./constants";
async function fetchAPI(endpoint) {
  const response = await fetch(
    `${apiURL}/${endpoint}&appid=${apiKey}&units=${units}`
  );
  if (!response.ok) {
    throw new Error("Error while trying to fetch api");
  }

  const data = await response.json();
  return data;
}

export default fetchAPI;
