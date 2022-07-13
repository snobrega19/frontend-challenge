import { Provider } from "react-redux";
import { store } from "../store/store";
import { renderWithClient } from "mocks/mock-handlers";
import SearchWeather from "./SearchWeather";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Renders with a redux provider and a query client provider", () => {
  const result = renderWithClient(
    <Provider store={store}>
      <SearchWeather />
    </Provider>
  );

  expect(result.getByRole("button", { name: "Search" })).toBeInTheDocument();
  screen.debug();
});

test("Search for a city and the searched city appears in the suggestions", () => {
  const result = renderWithClient(
    <Provider store={store}>
      <SearchWeather />
    </Provider>
  );
  const input = result.getByRole("textbox");
  userEvent.type(input, 'Lisbon');
  const searchButton = result.getByRole("button", {name: 'Search'});
  userEvent.click(searchButton);
  screen.debug();
});
