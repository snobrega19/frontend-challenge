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
  rest.get("*/onecall", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        daily: [
          {
            dt: 1657627200,
            temp: {
              day: 39,
              min: 17.11,
              max: 39.14,
              night: 25.89,
              eve: 32.15,
              morn: 23.03,
            },
            weather: [
              {
                id: 802,
                main: "Clouds",
                description: "scattered clouds",
                icon: "03d",
              },
            ],
          },
          {
            dt: 1657713600,
            temp: {
              day: 36.77,
              min: 21.46,
              max: 38.53,
              night: 21.54,
              eve: 28.65,
              morn: 22.44,
            },
            weather: [
              {
                id: 804,
                main: "Clouds",
                description: "overcast clouds",
                icon: "04d",
              },
            ],
          },
        ],
      })
    );
  }),
  rest.get("*/find", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        list: [
          {
            id: 2267057,
            name: "Lisbon",
            coord: {
              lat: 38.7167,
              lon: -9.1333,
            },
            main: {
              temp: 30.35,
              feels_like: 29.86,
              temp_min: 28.08,
              temp_max: 34.49,
              pressure: 1017,
              humidity: 38,
            },
            dt: 1657706954,
            wind: {
              speed: 3.09,
              deg: 0,
            },
            sys: {
              country: "PT",
            },
            rain: null,
            snow: null,
            clouds: {
              all: 0,
            },
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
          },
          {
            id: 4969622,
            name: "Lisbon",
            coord: {
              lat: 44.0315,
              lon: -70.1045,
            },
            main: {
              temp: 16.61,
              feels_like: 16.52,
              temp_min: 14.64,
              temp_max: 19.16,
              pressure: 1008,
              humidity: 84,
            },
            dt: 1657706978,
            wind: {
              speed: 0,
              deg: 0,
            },
            sys: {
              country: "US",
            },
            rain: null,
            snow: null,
            clouds: {
              all: 0,
            },
            weather: [
              {
                id: 701,
                main: "Mist",
                description: "mist",
                icon: "50d",
              },
            ],
          },
        ],
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
