import { createSlice } from "@reduxjs/toolkit";
const defaultState = {
  currentWeather: {},
  weekWeather: {},
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: defaultState,
  reducers: {
    setCurrentWeather(state, action) {
      state.currentWeather = action.payload;
    },
    setWeekWeather(state, action) {
      state.weekWeather = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice;
