import { Provider } from "react-redux";
import { store } from "../store/store";
import { renderWithClient } from "mocks/mock-handlers";
import SearchWeather from "./SearchWeather";
import { screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { server, rest } from "../mocks/node";

test("Renders with a redux provider and a query client provider", () => {
  //render component with redux provider and query client provider
  const result = renderWithClient(
    <Provider store={store}>
      <SearchWeather />
    </Provider>
  );

  //checks that there is a search button in the screen
  expect(result.getByRole("button", { name: "Search" })).toBeInTheDocument();
  screen.debug();
});

test("Search for a city and the searched city appears in the suggestions", async () => {
  //render component with redux provider and query client provider
  const result = renderWithClient(
    <Provider store={store}>
      <SearchWeather />
    </Provider>
  );

  //checks there is a input
  const input = result.getByRole("textbox");
  //types in the input the city "Lisbon"
  userEvent.type(input, "Lisbon");
  //clicks on the search button
  const searchButton = result.getByRole("button", { name: "Search" });
  fireEvent.click(searchButton);

  await waitFor(() => {
    //after the request (mocked request) appears buttons with suggestions based on searched city (Lisbon)
    const button = result.getByRole("button", { name: "Lisbon, PT" });
    expect(button).toBeInTheDocument();
  });
});
