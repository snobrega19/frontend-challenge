import "./App.css";
import ForecastWeekData from "./components/ForecastWeekData";
import CurrentWeather from "./components/CurrentWeather";
import SearchWeather from "./components/SearchWeather";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StatusBar from "components/UI/StatusBar";
import { useSelector, useDispatch } from "react-redux";
import { statusActions } from "store/status-slice";

function App() {
  
  const dispatch = useDispatch();
  const { showSuccess, showError, error, successMessage } = useSelector(
    (state) => state.status
  );
  const closeSuccessModal = () => {
    dispatch(statusActions.setShowSuccessToFalse());
  };

  const closeErrorModal = () => {
    dispatch(statusActions.setShowErrorToFalse());
  };
  return (
    <div>
      {showSuccess && (
        <div>
          <StatusBar
            onClose={setTimeout(() => closeSuccessModal(), 10000)}
            variant="success"
            message={successMessage}
          />
        </div>
      )}
      {showError && (
        <div>
          <StatusBar
            onClose={closeErrorModal}
            variant="danger"
            message={error}
          />
        </div>
      )}
      {!error && (
        <div className="weather-app text-gray-500">
          {/* <SearchWeather /> */}
          <CurrentWeather />
          {/* <ForecastWeekData /> */}
        </div>
      )}
    </div>
  );
}

export default App;
