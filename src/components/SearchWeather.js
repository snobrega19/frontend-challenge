import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "../store/weather-slice";
import { useState } from "react";
import "./SearchWeather.css";
import Modal from "./UI/Modal";
import { getFindEndpoint } from "../utils/request-configs";
import useConfirmModal from "hooks/useConfirmModal";
import { statusActions } from "store/status-slice";
import Selector from "./UI/Selector";
import { citiesActions } from "store/cities-slice";
import { useQuery } from "react-query";
import fetchAPI from "utils/fetch-api";
import useDebounce from "hooks/useDebounce";

function SearchWeather() {
  const dispatch = useDispatch();
  const [inputCity, setInputCity] = useState("");
  const { data: searchData } = useSelector(
    (state) => state.weather.searchWeather
  );
  const { showModal, message } = useSelector((state) => state.status.modal);
  const options = useSelector((state) =>
    state.cities.cities.map((city) => ({
      value: city,
      label: city,
    }))
  );
  const { confirmClickHandler } = useConfirmModal();
  const {
    data: dataResponse,
    isLoading,
    refetch,
  } = useQuery("searchData", () => fetchAPI(getFindEndpoint(inputCity)), {
    refetchOnWindowFocus: false,
    enabled: false,
    onError: (error) => {
      dispatch(
        statusActions.setErrorMessage(
          `Fail to search suggestions for '${inputCity}'.`
        )
      );
    },
    onSuccess: (data) => {
      dispatch(weatherActions.setSearchData(data));
      dispatch(
        statusActions.setSuccessMessage(
          `Successfully get suggestions for (${inputCity}).`
        )
      );
    },
  });

  function onCityChangeHandler(event) {
    setInputCity(event.target.value);
  }

  async function searchClickHandler() {
    refetch();
  }

  function setSelectedSearchData(data) {
    dispatch(citiesActions.addCityToList(data.name + ", " + data.sys.country));
    dispatch(
      weatherActions.setLatitudeAndLongitude({
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      })
    );
    dispatch(weatherActions.setSearchData(null));
    dispatch(weatherActions.setCity(data.name + ", " + data.sys.country));
    setInputCity("");
  }

  return (
    <div className="searchWeather">
      {showModal && (
        <Modal
          title="Are you sure?"
          show={showModal}
          close={() => setShowModal(false)}
          message={message}
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
          {searchData &&
            searchData.list.map((data) => (
              <button
                onClick={() => setSelectedSearchData(data)}
                key={Math.random()}
              >
                {data.name}, {data.sys.country}
              </button>
            ))}
        </div>
      </div>
      <Selector options={options} />
    </div>
  );
}

export default SearchWeather;
