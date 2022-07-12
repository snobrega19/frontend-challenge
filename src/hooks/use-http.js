import { useState, useCallback } from "react";
const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const units = "metric";
function useHttp() {
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = useCallback(async (endpoint, requestConfig = {}) => {
    setIsLoading(true);

    const response = await fetch(
      `${apiURL}/${endpoint}&appid=${apiKey}&units=${units}`,
      {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      }
    );

    if (!response.ok) {
      throw new Error("Request failed.");
    }

    // const data = await response.json();
    setIsLoading(false);
    return response;
  }, []);

  return {
    isLoading,
    makeRequest,
  };
}

export default useHttp;
