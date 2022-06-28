import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/weather-slice";

function SearchWeather() {
  const cities = useSelector((state) => state.weather.cities);
  const countries = useSelector((state) => state.weather.countries);
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const country = useSelector((state) => state.weather.country);
  // const [cities, setCities] = useState(initialCities);
  // const [countries, setCountries] = useState([]);

  function buttonClickHandler() {
    dispatch(actions.addCityCountry({ city, country }));
  }

  function onCityChangeHandler(event) {
    dispatch(actions.changeCity(event.target.value));
  }

  function onCountryChangeHandler(event) {
    dispatch(actions.changeCountry(event.target.value));
  }

  function onChangeCitiesHandler(event) {
    dispatch(actions.changeCity(event.target.value));
  }

  function onChangeCountriesHandler(event) {
    dispatch(actions.changeCountry(event.target.value));
  }
  return (
    <div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          onChange={onCityChangeHandler}
          value={city}
        />
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          onChange={onCountryChangeHandler}
          value={country}
        />
        <button onClick={buttonClickHandler}>Get Weather info</button>
      </div>
      <div>
        <select name="city" onChange={onChangeCitiesHandler} value={city}>
          <option></option>
          {cities &&
            cities.map((city) => <option key={Math.random()}>{city}</option>)}
        </select>

        <select
          name="country"
          onChange={onChangeCountriesHandler}
          value={country}
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
