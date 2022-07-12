import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

export const createMockHandlers = (rest) => [
  rest.get("*/weather", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        coord: {
          lon: -8.8032,
          lat: 39.7394,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        main: {
          temp: 35.99,
          feels_like: 33.33,
          temp_min: 29,
          temp_max: 41.89,
          pressure: 1019,
          humidity: 12,
        },
        dt: 1657290284,
        name: "Leiria",
        cod: 200,
      })
    );
  }),
];

export function renderWithClient(children) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
