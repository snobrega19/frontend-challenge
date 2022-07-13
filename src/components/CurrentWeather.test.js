import React from "react";
import CurrentWeather from "./CurrentWeather";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { renderWithClient } from "mocks/mock-handlers";
import { server, rest } from "../mocks/node";
import App from "../App";

test("Renders with a redux provider and a query client provider", () => {
  const result = renderWithClient(
    <Provider store={store}>
      <CurrentWeather />
    </Provider>
  );

  expect(result).toMatchSnapshot();
});

test("Renders current weather when the request is successfull", async () => {
  //render component with query client provider and redux provider
  const result = renderWithClient(
    <Provider store={store}>
      <CurrentWeather />
    </Provider>
  );
  //wait for "Leiria" to show in the screen after successfull request
  expect(await result.findByText(/Leiria/i)).toBeInTheDocument();
});
