export const createMockHandlers = (rest) => {
  rest.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=39.7394238&lon=-8.803215&appid=0e66409d2818073f5e8fd1d76d8a718d&units=metric",
    (req, res, ctx) => {
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
          base: "stations",
          main: {
            temp: 35.99,
            feels_like: 33.33,
            temp_min: 29,
            temp_max: 41.89,
            pressure: 1019,
            humidity: 12,
          },
          visibility: 10000,
          wind: {
            speed: 6.17,
            deg: 350,
          },
          clouds: {
            all: 0,
          },
          dt: 1657290284,
          sys: {
            type: 1,
            id: 6896,
            country: "PT",
            sunrise: 1657257275,
            sunset: 1657310732,
          },
          timezone: 3600,
          id: 8012366,
          name: "Leiria",
          cod: 200,
        })
      );
    }
  );
};
