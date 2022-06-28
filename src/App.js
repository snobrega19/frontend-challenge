import "./App.css";
import ForecastWeekData from "./components/ForecastWeekData";
import CurrentWeather from "./components/CurrentWeather";
import SearchWeather from "./components/SearchWeather";

function App() {
  return (
    <div className="app">
      <SearchWeather />
      <CurrentWeather />
      <ForecastWeekData />
    </div>
  );
}

export default App;
