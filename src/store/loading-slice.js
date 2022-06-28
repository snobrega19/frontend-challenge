import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  loadCurrentWeather: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: defaultState,
  reducers: {
    setLoading(state, action) {
      state.loadCurrentWeather = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice;
