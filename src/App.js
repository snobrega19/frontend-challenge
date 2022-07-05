import "./App.css";
import ForecastWeekData from "./components/ForecastWeekData";
import CurrentWeather from "./components/CurrentWeather";
import SearchWeather from "./components/SearchWeather";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <div className="weather-app text-gray-500">
        {/* <SearchWeather /> */}
        <CurrentWeather />
        {/* <ForecastWeekData /> */}
      </div>
    </div>
  );
}

export default App;
