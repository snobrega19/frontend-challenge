import { createSlice } from "@reduxjs/toolkit";
const defaultState = {
  error: null,
  successMessage: null,
  showError: false,
  showSuccess: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState: defaultState,
  reducers: {
    setSuccessMessage(state, action) {
      if (
        state.successMessage != null &&
        !state.successMessage.includes(action.payload)
      ) {
        state.successMessage = state.successMessage + "\n" + action.payload;
      } else {
        state.successMessage = action.payload;
      }
      state.showSuccess = true;
      state.showError = false;
    },
    setErrorMessage(state, action) {
      if (state.error != null && !state.error.includes(action.payload)) {
        state.error = state.error + "\n" + action.payload;
      } else {
        state.error = action.payload;
      }
      state.showError = true;
      state.showSuccess = false;
    },
    setShowErrorToFalse(state) {
      state.showError = false;
    },
    setShowSuccessToFalse(status) {
      status.showSuccess = false;
    },
  },
});

export const statusActions = statusSlice.actions;
export default statusSlice;
