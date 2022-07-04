import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  latitude: null,
  longitude: null,
};

const forecastWeatherSlice = createSlice({
  name: "forecast",
  initialState: defaultState,
  reducers: {
    setLatitudeAndLongitude(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const forecastActions = forecastWeatherSlice.actions;
export default forecastWeatherSlice;
