import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/weather-slice";
import { loadingActions } from "../store/loading-slice";
import { useState } from "react";
import { forecastActions } from "../store/forecast-weather-slice";
import "./SearchWeather.css";
const apiKey = "32e6a9e3a7ab0fc0b70086d0b3990a44";
const units = "metric";

function SearchWeather() {
  const [inputCity, setInputCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const cities = useSelector((state) => state.weather.cities);
  const countries = useSelector((state) => state.weather.countries);
  const dispatch = useDispatch();

  const [searchDataArray, setSearchDataArray] = useState(null);

  function onCityChangeHandler(event) {
    setInputCity(event.target.value);
  }

  function onChangeCitiesHandler(event) {
    setSelectedCity(event.target.value);
  }

  function onChangeCountriesHandler(event) {
    setSelectedCountry(event.target.value);
  }

  async function searchClickHandler() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${inputCity}&appid=${apiKey}&units=${units}`
    );
    const data = await response.json();
    setSearchDataArray(data);
  }

  function setSelectedSearchData(city, countryCode, latitude, longitude) {
    dispatch(actions.addCityCountry({ city: city, country: countryCode }));
    setSelectedCity(city);
    setSelectedCountry(countryCode);
    dispatch(loadingActions.setloadCurrentWeather(true));
    setInputCity("");
    dispatch(forecastActions.setLatitudeAndLongitude({ latitude, longitude }));
    dispatch(loadingActions.setLoadForecastData(true));
    setSearchDataArray(null);
  }

  return (
    <div>
      <div>
        <label htmlFor="city">City:</label>
        <div className="container">
          <input
            className="container__input"
            type="text"
            id="city"
            value={inputCity}
            onChange={onCityChangeHandler}
          />
        </div>
        <button onClick={searchClickHandler}>Search</button>
        {searchDataArray && (
          <ul className="nobull">
            {searchDataArray.list.map((data) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                href="#"
                onClick={(e) =>
                  setSelectedSearchData(
                    data.name,
                    data.sys.country,
                    data.coord.lat,
                    data.coord.lon
                  )
                }
                key={Math.random()}
              >
                <li>
                  {data.name}, {data.sys.country}
                </li>
              </a>
            ))}
          </ul>
        )}
      </div>
      <div>
        <select
          name="city"
          onChange={onChangeCitiesHandler}
          value={selectedCity}
        >
          <option></option>
          {cities &&
            cities.map((city) => <option key={Math.random()}>{city}</option>)}
        </select>

        <select
          name="country"
          onChange={onChangeCountriesHandler}
          value={selectedCountry}
        >
          <option></option>
          {countries &&
            countries.map((country) => (
              <option key={Math.random()} value={country}>
                {country}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default SearchWeather;
