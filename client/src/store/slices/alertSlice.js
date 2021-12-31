import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const alertSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    addAlert: (state, { payload }) => {
      state.push(payload);
    },
    removeAlert: (state, { payload }) => {
      const index = state.findIndex((alert) => alert.id === payload);
      state.splice(index, 1);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export function setAlert(msg, alertType, timeout = 5000) {
  return async (dispatch) => {
    const id = uuidv4();
    const payload = {
      msg,
      alertType,
      id,
    };
    dispatch(addAlert(payload));
    setTimeout(() => dispatch(removeAlert(id)), timeout);
  };
}

export default alertSlice.reducer;
