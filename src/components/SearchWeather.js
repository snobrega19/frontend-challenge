import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/weather-slice";
import { loadingActions } from "../store/loading-slice";
import { useState } from "react";

function SearchWeather() {
  const [inputCity, setInputCity] = useState("");
  const [inputCountry, setInputCoutry] = useState("");
  const cities = useSelector((state) => state.weather.cities);
  const countries = useSelector((state) => state.weather.countries);
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const country = useSelector((state) => state.weather.country);
  // const [cities, setCities] = useState(initialCities);
  // const [countries, setCountries] = useState([]);

  function buttonClickHandler() {
    dispatch(
      actions.addCityCountry({ city: inputCity, country: inputCountry })
    );
    dispatch(loadingActions.setLoading(true));
  }

  function onCityChangeHandler(event) {
    setInputCity(event.target.value);
  }

  function onCountryChangeHandler(event) {
    setInputCoutry(event.target.value);
  }

  function onChangeCitiesHandler(event) {
    dispatch(actions.changeCity(event.target.value));
    dispatch(loadingActions.setLoading(false));
  }

  function onChangeCountriesHandler(event) {
    dispatch(actions.changeCountry(event.target.value));
    dispatch(loadingActions.setLoading(false));
  }
  return (
    <div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={inputCity}
          onChange={onCityChangeHandler}
        />
        <label htmlFor="country">Country Code:</label>
        <input
          type="text"
          id="country"
          value={inputCountry}
          onChange={onCountryChangeHandler}
        />
        <button onClick={buttonClickHandler}>Get Weather info</button>
      </div>
      <div>
        <select name="city" onChange={onCityChangeHandler} value={inputCity}>
          <option></option>
          {cities &&
            cities.map((city) => <option key={Math.random()}>{city}</option>)}
        </select>

        <select
          name="country"
          onChange={onCountryChangeHandler}
          value={inputCountry}
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
