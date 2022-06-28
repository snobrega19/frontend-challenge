import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  cities: [],
  countries: [],
  city: "",
  country: "",
  loadCurrentWeather: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: defaultState,
  reducers: {
    addCityCountry(state, action) {
      const newCity = action.payload.city;
      const existingCity = state.cities.find((city) => city === newCity);
      if (!existingCity) {
        state.cities = [...state.cities, newCity];
      }
      const newCountry = action.payload.country;
      const existingCountry = state.countries.find(
        (country) => country === newCountry
      );
      if (!existingCountry) {
        state.countries = [...state.countries, newCountry];
      }
      state.city = newCity;
      state.country = newCountry;
      state.loadCurrentWeather = true;
    },
    changeCity(state, action) {
      state.city = action.payload;
    },
    changeCountry(state, action) {
      state.country = action.payload;
    },
  },
});

export const actions = weatherSlice.actions;
export default weatherSlice;
