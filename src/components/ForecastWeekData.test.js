import CurrentWeather from "./CurrentWeather";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { renderWithClient } from "mocks/mock-handlers";
import ForecastWeekData from "./ForecastWeekData";

test("Renders with a redux provider and a query client provider", () => {
  const result = renderWithClient(
    <Provider store={store}>
      <ForecastWeekData />
    </Provider>
  );

  expect(result).toMatchSnapshot();
});