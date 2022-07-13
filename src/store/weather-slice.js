import { createSlice } from "@reduxjs/toolkit";
const defaultState = {
  currentWeather: {
    data: null,
  },
  weekWeather: {
    data: null,
  },
  searchWeather: {
    data: null,
  },
  coordinates: {
    latitude: null,
    longitude: null,
  },
  city: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: defaultState,
  reducers: {
    setCurrentWeather(state, action) {
      state.currentWeather.data = action.payload;
    },
    setWeekWeather(state, action) {
      state.weekWeather.data = action.payload;
    },
    setSearchData(state, action) {
      state.searchWeather.data = action.payload;
    },
    setLatitudeAndLongitude(state, action) {
      state.coordinates = action.payload;
    },
    clearLatitudeAndLongitude(state) {
      state.coordinates = {
        latitude: null,
        longitude: null,
      };
    },
    setWeatherObj(state, action) {
      state = {
        ...state,
        ...action.payload,
      };

      console.log(state.coordinates);
    },
    setCity(state, action) {
      state.city = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice;
