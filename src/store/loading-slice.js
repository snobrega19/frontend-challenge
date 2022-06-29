import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  loadCurrentWeather: false,
  loadForecastData: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: defaultState,
  reducers: {
    setloadCurrentWeather(state, action) {
      state.loadCurrentWeather = action.payload;
    },
    setLoadForecastData(state, action) {
      state.loadForecastData = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice;
