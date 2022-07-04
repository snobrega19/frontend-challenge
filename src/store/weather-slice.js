import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const defaultState = {
  cities: [],
  city: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: defaultState,
  reducers: {
    addCity(state, action) {
      const newCity = action.payload;
      const existingCity = state.cities.find((city) => city === newCity);
      if (!existingCity) {
        state.cities = [...state.cities, newCity];
      }
      state.city = newCity;
    },
    changeCity(state, action) {
      state.city = action.payload;
    },
    resetStore() {
      storage.removeItem("persist:root");
      return defaultState;
    },
    removeCity(state, action) {
      const cityToRemove = state.cities.find((city) => city === action.payload);
      if (cityToRemove) {
        state.cities = state.cities.filter((city) => city !== cityToRemove);
      }
      state.city = "";
    },
  },
});

export const actions = weatherSlice.actions;
export default weatherSlice;
