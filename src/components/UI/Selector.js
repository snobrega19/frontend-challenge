import Option, { styles } from "./SelectorOption";
import Select from "react-select";
import "./Selector.css";
import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "../../store/weather-slice";
import { getFindEndpoint } from "../../utils/request-configs";
import { statusActions } from "store/status-slice";
import { citiesActions } from "store/cities-slice";
import { useQuery } from "react-query";
import fetchAPI from "utils/fetch-api";
import { useEffect, useState } from "react";
import useDebounce from "hooks/useDebounce";

function Selector(props) {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState(null);
  const [findCity, setFindCity] = useState(false);
  const city = useSelector((state) => state.weather.city);
  const debouncedCity = useDebounce(city, 500);
  const { refetch } = useQuery(
    "selector",
    () => fetchAPI(getFindEndpoint(debouncedCity)),
    {
      refetchOnWindowFocus: false,
      enabled: !!debouncedCity && findCity,
      onError: (error) => {
        dispatch(
          statusActions.setErrorMessage(
            `Fail to get coordinates for the selected city.`
          )
        );
      },
      onSuccess: (data) => {
        let latitude, longitude;
        let cityData = data ? data.list.find((c) => c.name === cityName) : null;
        if (cityData) {
          latitude = cityData.coord.lat;
          longitude = cityData.coord.lon;
        }

        dispatch(
          weatherActions.setLatitudeAndLongitude({ latitude, longitude })
        );
      },
    }
  );

  async function onChangeCitiesHandler(data) {
    const value = data.value;
    if (value !== "") {
      dispatch(weatherActions.setCity(value));
      setCityName(value.split(",")[0]);
      setFindCity(true);
    }
  }

  function clearAllhandler() {
    dispatch(
      statusActions.setModalProps({
        message: "Are you sure you want to delete all searched cities?",
        clearAll: true,
        showModal: true,
      })
    );
  }

  function onDelete(data) {
    dispatch(
      statusActions.setModalProps({
        message: `Are you sure you want to delete ${data.value}?`,
        clearAll: false,
        showModal: true,
        dataToDelete: data,
      })
    );
  }

  useEffect(() => {
    if (debouncedCity && findCity) {
      refetch();
    }
  }, [debouncedCity, findCity]);

  return (
    <div className="select">
      <Select
        value={props.options.filter(({ value }) => value === city)}
        styles={styles}
        onChange={onChangeCitiesHandler}
        options={props.options}
        components={{ Option }}
        closeMenuOnScroll={false}
        deleteOption={onDelete}
      />
      <button className="buttonClearAll" onClick={clearAllhandler}>
        Clear All
      </button>
    </div>
  );
}

export default Selector;
