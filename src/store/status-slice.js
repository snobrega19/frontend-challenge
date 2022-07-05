import { createSlice } from "@reduxjs/toolkit";
const defaultState = {
  error: {},
  success: {},
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
