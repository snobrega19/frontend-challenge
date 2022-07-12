import Option, { styles } from "./SelectorOption";
import Select from "react-select";
import "./Selector.css";
import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "../../store/weather-slice";
import { getFindEndpoint } from "../../utils/request-configs";
import { statusActions } from "store/status-slice";
import { citiesActions } from "store/cities-slice";

function Selector(props) {
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.cities);
  async function onChangeCitiesHandler(data) {
    const value = data.value;
    if (value !== "") {
      dispatch(citiesActions.setCity(value));

      let city = value.split(",")[0];
      let latitude, longitude;

      getCoordinatesByCity(getFindEndpoint(city))
        .then((res) => {
          latitude = res.list.find((c) => c.name === city).coord.lat;
          longitude = res.list.find((c) => c.name === city).coord.lon;

          dispatch(
            weatherActions.setLatitudeAndLongitude({ latitude, longitude })
          );
          dispatch(weatherActions.setloadCurrentWeather(true));
          dispatch(weatherActions.setLoadForecastData(true));
        })
        .catch(() => {
          dispatch(
            statusActions.setErrorMessage(
              `Fail to get coordinates for the selected city.`
            )
          );
        });
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
