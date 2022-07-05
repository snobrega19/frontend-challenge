import { createSlice } from "@reduxjs/toolkit";
const defaultState = {
  error: null,
  success: null,
  showError: false,
  showSuccess: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState: defaultState,
  reducers: {},
});

export const statusActions = statusSlice.actions;
export default statusSlice;
