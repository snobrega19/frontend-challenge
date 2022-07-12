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

test("Renders forecast week data when the request is successfull", async () => {
  //render component with query client provider and redux provider
  const result = renderWithClient(
    <Provider store={store}>
      <ForecastWeekData />
    </Provider>
  );
  //wait for 2 divs to be rendered with forecast data after successfull request
  expect(await result.findAllByTestId(/weekDay/i)).toHaveLength(2);
});
