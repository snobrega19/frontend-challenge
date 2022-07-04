import { useState, useCallback } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);

    const response = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      headers: requestConfig.headers ? requestConfig.headers : {},
    });

    if (!response.ok) {
      throw new Error("Request failed.");
    }

    const data = await response.json();
    setIsLoading(false);
    return data;
  }, []);

  return {
    isLoading,
    makeRequest,
  };
}

export default useHttp;
