import { logout } from "./authSlice";

const { createSlice } = require("@reduxjs/toolkit");

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    toastMsg: {},
  },
  reducers: {
    setNotify: (state, { payload }) => {
      state.toastMsg = payload;
    },
    removeNotify: (state) => {
      state.toastMsg = {};
    },
  },
  extraReducers: {
    [logout.type]: (state) => {
      state.toastMsg = { success: "Logged out!" };
    },
  },
});

export const { setNotify, removeNotify } = notifySlice.actions;

export default notifySlice.reducer;
