import React from "react";
import { render, screen } from "@testing-library/react";
import CurrentWeather from "./CurrentWeather";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { QueryClientProvider, QueryClient } from "react-query";

test("Renders with a redux provider and a query client provider", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CurrentWeather />
      </QueryClientProvider>
    </Provider>
  );
});

test("Renders current weather when the request is successfull", async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CurrentWeather />
      </QueryClientProvider>
    </Provider>
  );
  expect(await screen.findByText(/Leiria/i)).toBeInTheDocument();
  screen.debug();
});
