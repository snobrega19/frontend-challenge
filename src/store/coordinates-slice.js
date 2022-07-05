import { createSlice } from "@reduxjs/toolkit";
const defaultLatitude = 39.74362;
const defaultLongitude = -8.80705;

const defaultState = {
  latitude: defaultLatitude,
  longitude: defaultLongitude,
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState: defaultState,
  reducers: {
    setLatitudeAndLongitude(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    clear() {
      return defaultState;
    },
  },
});

export const coordinatesActions = coordinatesSlice.actions;
export default coordinatesSlice;
