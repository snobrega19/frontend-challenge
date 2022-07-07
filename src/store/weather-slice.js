import { createSlice } from "@reduxjs/toolkit";
const defaultState = {
  currentWeather: {
    data: null,
    loadCurrentWeather: false,
  },
  weekWeather: {
    data: null,
    loadForecastData: false,
  },
  searchWeather: {
    data: null,
  },
  coordinates: {
    latitude: null,
    longitude: null,
  },
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
      state.coordinates.latitude = action.payload.latitude;
      state.coordinates.longitude = action.payload.longitude;
    },
    clearLatitudeAndLongitude(state) {
      state.coordinates.latitude = null;
      state.coordinates.longitude = null;
    },
    setloadCurrentWeather(state, action) {
      state.currentWeather.loadCurrentWeather = action.payload;
    },
    setLoadForecastData(state, action) {
      state.weekWeather.loadForecastData = action.payload;
    },
    setWeatherObj(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice;
