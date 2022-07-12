import { Provider } from "react-redux";
import { store } from "../store/store";
import { renderWithClient } from "mocks/mock-handlers";
import ForecastWeekData from "./ForecastWeekData";
import App from "../App";
import { server, rest } from "../mocks/node";

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

test("Show error message when request fails", async () => {
  //mock request to get error
  server.use(
    rest.get("*/onecall", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  //render component with query client provider and redux provider
  const result = renderWithClient(
    <Provider store={store}>
      <App />
    </Provider>
  );
  //shows error message in App.js when request fails
  expect(
    await result.findByText(/Fail to get forecast data for this location./i)
  ).toBeInTheDocument();
});
