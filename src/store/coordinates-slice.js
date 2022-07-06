import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  latitude: null,
  longitude: null,
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
