import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const defaultState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState: defaultState,
  reducers: {
    addCityToList(state, action) {
      const newCity = action.payload;
      const existingCity = state.cities.find((city) => city === newCity);
      if (!existingCity) {
        state.cities = [...state.cities, newCity];
      }
    },
    removeCityFromList(state, action) {
      const cityToRemove = state.cities.find((city) => city === action.payload);
      if (cityToRemove) {
        state.cities = state.cities.filter((city) => city !== cityToRemove);
      }
    },
    resetStore() {
      storage.removeItem("persist:root");
      return defaultState;
    },
  },
});

export const citiesActions = citiesSlice.actions;
export default citiesSlice;
