import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/weather-slice";
import { loadingActions } from "../store/loading-slice";
import { useState } from "react";
import { forecastActions } from "../store/forecast-weather-slice";
import "./SearchWeather.css";
import Option, { styles } from "./UI/SelecterOption";
import Select from "react-select";
import Modal from "./UI/Modal";
import useHttp from "../hooks/use-http";
import StatusBar from "./UI/StatusBar";
const apiKey = "0e66409d2818073f5e8fd1d76d8a718d";
const units = "metric";

function SearchWeather() {
  const [inputCity, setInputCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchDataArray, setSearchDataArray] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isClearAll, setIsClearAll] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const cities = useSelector((state) => state.weather.cities);
  const { makeRequest: getCoordinatesByCity } = useHttp();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  let options = [];
  cities.forEach((city) => {
    options.push({
      value: city,
      label: city,
    });
  });

  function onCityChangeHandler(event) {
    setInputCity(event.target.value);
  }

  function getRequestConfig(city = null) {
    let requestConfig = null;
    if (inputCity) {
      requestConfig = {
        url: `https://api.openweathermap.org/data/2.5/find?q=${inputCity}&appid=${apiKey}&units=${units}`,
      };
    } else {
      requestConfig = {
        url: `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=${units}`,
      };
    }
    return requestConfig;
  }

  async function onChangeCitiesHandler(selectedCity) {
    const value = selectedCity.value;
    if (value !== "") {
      setSelectedCity(value);
      dispatch(actions.addCity(value));

      let city = value.split(",")[0];
      let latitude, longitude;

      getCoordinatesByCity(getRequestConfig(city))
        .then((res) => {
          latitude = res.list.find((c) => c.name === city).coord.lat;
          longitude = res.list.find((c) => c.name === city).coord.lon;

          dispatch(
            forecastActions.setLatitudeAndLongitude({ latitude, longitude })
          );
          dispatch(loadingActions.setloadCurrentWeather(true));
          dispatch(loadingActions.setLoadForecastData(true));
        })
        .catch(() => {
          setShowError(true);
          setShowSuccess(false);
          setError(`Fail to get coordinates for the selected city.`);
        });
    }
  }

  async function searchClickHandler() {
    getCoordinatesByCity(getRequestConfig())
      .then((res) => {
        setSearchDataArray(res);
        setShowSuccess(true);
        setShowError(false);
        setSuccessMessage(`Successfully get suggestions for (${inputCity}).`);
      })
      .catch(() => {
        setShowError(true);
        setShowSuccess(false);
        setError(`Fail to search suggestions for '${inputCity}'.`);
      });
  }

  function setSelectedSearchData(city, countryCode, latitude, longitude) {
    dispatch(actions.addCity(city + ", " + countryCode));
    setSelectedCity(city + ", " + countryCode);
    dispatch(loadingActions.setloadCurrentWeather(true));
    setInputCity("");
    dispatch(forecastActions.setLatitudeAndLongitude({ latitude, longitude }));
    dispatch(loadingActions.setLoadForecastData(true));
    setSearchDataArray(null);
  }

  function clearAllhandler() {
    setAlertMessage("Are you sure you want to delete all searched cities?");
    setIsClearAll(true);
    setShowModal(true);
  }

  function onDelete(data) {
    setIsClearAll(false);
    setDataToDelete(data);
    setAlertMessage(`Are you sure you want to delete ${data.value}`);
    setShowModal(true);
  }

  function confirmClickHandler() {
    if (isClearAll) {
      dispatch(actions.resetStore());
      dispatch(forecastActions.clear());
    } else {
      dispatch(actions.removeCity(dataToDelete.value));
      dispatch(forecastActions.clear());
    }

    setShowModal(false);
  }

  const closeSuccessModal = () => {
    setShowSuccess(false);
  };

  const closeErrorModal = () => {
    setShowError(false);
  };

  return (
    <div className="searchWeather">
      {showSuccess && (
        <div>
          <StatusBar
            onClose={setTimeout(() => closeSuccessModal(), 3000)}
            variant="success"
            message={successMessage}
          />
        </div>
      )}
      {showError && (
        <div>
          <StatusBar
            onClose={setTimeout(() => closeErrorModal(), 3000)}
            variant="danger"
            message={error}
          />
        </div>
      )}
      {showModal && (
        <Modal
          title="Are you sure?"
          show={showModal}
          close={() => setShowModal(false)}
          message={alertMessage}
          onButtonClick={confirmClickHandler}
          onCancelClick={() => setShowModal(false)}
        />
      )}
      <div className="search">
        <div className="city">
          <input
            type="text"
            id="city"
            value={inputCity}
            onChange={onCityChangeHandler}
            placeholder="Search City"
          />
        </div>
        <button onClick={searchClickHandler}>Search</button>
        <div className="searchList">
          {searchDataArray &&
            searchDataArray.list.map((data) => (
              <button
                onClick={() =>
                  setSelectedSearchData(
                    data.name,
                    data.sys.country,
                    data.coord.lat,
                    data.coord.lon
                  )
                }
                key={Math.random()}
              >
                {data.name}, {data.sys.country}
              </button>
            ))}
        </div>
      </div>
      <div className="select">
        <Select
          value={options.filter(({ value }) => value === selectedCity)}
          styles={styles}
          onChange={onChangeCitiesHandler}
          options={options}
          components={{ Option }}
          closeMenuOnScroll={false}
          deleteOption={onDelete}
        />
        <button className="buttonClearAll" onClick={clearAllhandler}>
          Clear All
        </button>
      </div>
    </div>
  );
}

export default SearchWeather;
