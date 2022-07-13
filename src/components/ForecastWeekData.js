import useCurrentPosition from "hooks/useCurrentPosition";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { weekDay } from "utils/date-functions";
import { getWeekWeatherEndpoint } from "../utils/request-configs";
import { statusActions } from "store/status-slice";
import { weatherActions } from "store/weather-slice";
import "./ForecastWeekData.css";
import { defaultLatitude, defaultLongitude } from "../utils/constants";
import { useQuery } from "react-query";
import fetchAPI from "utils/fetch-api";

function ForecastWeekData() {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.weather.coordinates);
  const { data: weekWeather } = useSelector(
    (state) => state.weather.weekWeather
  );

  useCurrentPosition(); //gets current longitude and latitude and sets values

  const {
    data: dataResponse,
    isLoading,
    refetch,
  } = useQuery(
    "forecastData",
    () =>
      fetchAPI(
        getWeekWeatherEndpoint({
          latitude: coordinates.latitude ?? defaultLatitude,
          longitude: coordinates.longitude ?? defaultLongitude,
        })
      ),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        dispatch(
          statusActions.setErrorMessage(
            "Fail to get forecast data for this location."
          )
        );
      },
      onSuccess: (data) => {
        dispatch(weatherActions.setWeekWeather(data));
        dispatch(
          statusActions.setSuccessMessage(
            "Get forecast data for the next 7 days for this location with success."
          )
        );
      },
    }
  );

  useEffect(() => {
    refetch();
    console.log(dataResponse);
  }, [dataResponse, coordinates]);

  return (
    <div className="forecast-data">
      {weekWeather && (
        <div className="weekForecast">
          {weekWeather.daily.map((week) => (
            <div key={week.dt} className="dayForecast" data-testid="weekDay">
              <p>{weekDay(week.dt)}</p>
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
